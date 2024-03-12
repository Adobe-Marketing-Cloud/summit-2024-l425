/* 
* <license header>
*/

/**
 * This is a sample action showcasing how to access an external API
 *
 * Note:
 * You might want to disable authentication and authorization checks against Adobe Identity Management System for a generic action. In that case:
 *   - Remove the require-adobe-auth annotation for this action in the manifest.yml of your application
 *   - Remove the Authorization header from the array passed in checkMissingRequestInputs
 *   - The two steps above imply that every client knowing the URL to this deployed action will be able to invoke it without any authentication and authorization checks against Adobe Identity Management System
 *   - Make sure to validate these changes against your security requirements before deploying the action
 */


const { Core } = require('@adobe/aio-sdk')
const { context, getToken } = require('@adobe/aio-lib-ims')

const EVENT_TYPE = 'aem.sites.contentFragment.modified'

async function getAemApiTokenFromParams(params)
{
  if (!params?.AEM_TECHNICAL_ACCOUNT_ID) {
    return params?.AEM_LOCAL_TOKEN;
  }

  context.set('aemcs_jwt', {
    meta_scopes: [
      'ent_aem_cloud_api'
    ],
    client_id: params?.AEM_TECHNICAL_ACCOUNT_CLIENT_ID,
    client_secret: params?.AEM_TECHNICAL_ACCOUNT_CLIENT_SECRET,
    technical_account_id: params?.AEM_TECHNICAL_ACCOUNT_ID,
    ims_org_id: params?.AEM_TECHNICAL_ACCOUNT_ORG,
    private_key: params?.AEM_TECHNICAL_ACCOUNT_PRIVATE_KEY
  });
  return await getToken('aemcs_jwt');
}

function getAemRepoFromParams(params) {
  const env = /p\d+-e\d+/.exec(params.source);
  if (env === null) {
    throw new Error(`Unexpected event source format: "${source}"`);
  }

  return `author-${env}.adobeaemcloud.com`;
}

function getFragmentIdFromParams(params) {
  const fragmentId = params?.data?.id;
  if (!fragmentId) {
    throw new Error(`Unable to define content fragment id.`);
  }

  return fragmentId;
}

async function fetchLastContentFragmentVersion({repo, fragmentId, token})
{
  const apiEndpoint = `https:/${repo}/adobe/sites/cf/fragments/${fragmentId}/versions?limit1`;
  const res = await fetch(
    apiEndpoint,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Adobe-Accept-Unsupported-API': '1',
        'Authorization': `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    throw new Error(`Request to  ${apiEndpoint} failed with status code ${res.status} for ${t}`)
  }

  const data = await res.json();
  const versions = data?.items || [];
  return versions.length ? versions[0] : null;
}

async function createVersion({repo, fragmentId, token})
{
  const apiEndpoint = `https://${repo}/adobe/sites/cf/fragments/${fragmentId}/versions`;

  // fetch content from external api endpoint
  const res = await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Adobe-Accept-Unsupported-API': '1',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      label: `Auto Version ${new Date().toString()}`
    })
  });

  if (!res.ok) {
    throw new Error(`Request to  ${apiEndpoint} failed with status code ${res.status}`)
  }
}

// main function that will be executed by Adobe I/O Runtime
const main = async ({
  AUTOVERSION_THRESHOLD,
  ...params
}) => {
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })
  if (params?.type !== EVENT_TYPE) {
    throw new Error(`Invalid event type received: expected AEM Sites event of type "${EVENT_TYPE}" but received: "${params?.type || "unknown"}"`);
  }
  
  const token = await getAemApiTokenFromParams(params);

  const repo = getAemRepoFromParams(params);
  const fragmentId = getFragmentIdFromParams(params);

  try {
    const version = await fetchLastContentFragmentVersion({repo, fragmentId, token});
    
    if (version) {
      const versionAge = version ? new Date() - new Date(version.created) : null;
      if (versionAge < AUTOVERSION_THRESHOLD * 60000) {
        return;
      }
    }

    await createVersion({repo, fragmentId, token});
    console.log(`Success: auto version created for ${fragmentId} in ${repo}.`);
  } catch (e) {
    console.log(`Failure: auto version not created for ${fragmentId} in ${repo}: ${e}`);
  }
}

exports.main = main
