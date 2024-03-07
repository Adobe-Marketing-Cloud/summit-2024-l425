# Inputs

## Step 2.2.2 – Create new App Builder Project 

Project name:
```
l425extXX // replace XX with your workstation number
```

## Step 2.2.3 – Initialize extension source code 

CLI commands:
```sh
mkdir ext 
cd ext
aio app init
```

Extension name:
```
Create Version
```

Extension Description:
```
Create version for content fragment without its publication
```

## Step 2.2.4 – preview local extension 

CLI commands:
```sh
aio app run
```

URL parameters:
```
devMode=true&ext=https://localhost:9080&
```

## Step 2.2.5 – Update button design 

Update `ext/src/aem-cf-editor-1/web-src/src/components/ExtensionRegistration.js` lines 21:
```javascript
                icon: 'Stopwatch',
                variant: 'action',
```

Final file `ext/src/aem-cf-editor-1/web-src/src/components/ExtensionRegistration.js`:
```javascript
/*
 * <license header>
 */

import { Text } from "@adobe/react-spectrum";
import { register } from "@adobe/uix-guest";
import { extensionId } from "./Constants";

function ExtensionRegistration() {
  const init = async () => {
    const guestConnection = await register({
      id: extensionId,
      methods: {
        headerMenu: {
          getButtons() {
            return [
              // @todo YOUR HEADER BUTTONS DECLARATION SHOULD BE HERE
              {
                id: 'create-version',
                label: 'Create Version',
                icon: 'Stopwatch',
                variant: 'action',
                onClick() {
                  const modalURL = "/index.html#/create-version-modal";
                  console.log("Modal URL: ", modalURL);

                  guestConnection.host.modal.showUrl({
                    title: "Create Version",
                    url: modalURL,
                  });
                },
              },
            ];
          },
        },
      }
    });
  };
  init().catch(console.error);

  return <Text>IFrame for integration with Host (AEM)...</Text>;
}

export default ExtensionRegistration;
```

## Step 2.2.6 – Implement create new version form 

> Updates for file `ext/src/aem-cf-editor-1/web-src/src/components/CreateversionModal.js`:

Update 1 (Line 20, add codo):
```javascript
  const [submitted, setSubmitted] = useState();
```

Update 2 (Line 34, replace JSX):
```javascript
  const onCreateHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <Provider theme={defaultTheme} colorScheme="light">
      {guestConnection && !submitted ? (
        <Form
          validationBehavior="native"
          onSubmit={onCreateHandler}
          marginX="size-150"
        >
          <TextField name="label" label="Label" isRequired />

          <TextArea name="comment" label="Comment" />

          <ButtonGroup align="end">
            <Button type="reset" variant="action" onClick={onCloseHandler}>
              Close
            </Button>

            <Button type="submit" variant="cta">
              Create
            </Button>
          </ButtonGroup>
        </Form>
      ) : (
        <ProgressBar
          label={submitted ? "Creating..." : "Connecting..."}
          isIndeterminate
        />
      )}
    </Provider>
  );
```

Update 3 (update imported components from `@adobe/react-spectrum`):
```javascript
import {
  Provider,
  defaultTheme,
  ProgressBar,
  Form,
  TextField,
  TextArea,
  ButtonGroup,
  Button,
} from "@adobe/react-spectrum";
```

Final file `ext/src/aem-cf-editor-1/web-src/src/components/CreateversionModal.js`:
```javascript
/*
 * <license header>
 */

import React, { useState, useEffect } from "react";
import { attach } from "@adobe/uix-guest";
import {
  Provider,
  defaultTheme,
  ProgressBar,
  Form,
  TextField,
  TextArea,
  ButtonGroup,
  Button,
} from "@adobe/react-spectrum";

import { extensionId } from "./Constants";

export default function () {
  const [guestConnection, setGuestConnection] = useState();
  const [submitted, setSubmitted] = useState();

  useEffect(() => {
    (async () => {
      const guestConnection = await attach({ id: extensionId });

      setGuestConnection(guestConnection);
    })();
  }, []);

  const onCloseHandler = () => {
    guestConnection.host.modal.close();
  };

  const onCreateHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <Provider theme={defaultTheme} colorScheme="light">
      {guestConnection && !submitted ? (
        <Form
          validationBehavior="native"
          onSubmit={onCreateHandler}
          marginX="size-150"
        >
          <TextField name="label" label="Label" isRequired />

          <TextArea name="comment" label="Comment" />

          <ButtonGroup align="end">
            <Button type="reset" variant="action" onClick={onCloseHandler}>
              Close
            </Button>

            <Button type="submit" variant="cta">
              Create
            </Button>
          </ButtonGroup>
        </Form>
      ) : (
        <ProgressBar
          label={submitted ? "Creating..." : "Connecting..."}
          isIndeterminate
        />
      )}
    </Provider>
  );
}
```

## Step 2.2.7 – Runtime action for API invocation 

CLI commands:
```sh
aio app add action
```

Action name:
```
create-version
```

> Updates for file `ext/src/aem-cf-editor-1/actions/create-version/index.js`.

Update 1 (declare required parameters, line 20):
```javascript
    const requiredParams = ['repo', 'fragmentId']
```

Update 2 (invoke create version API, replace lines 46-54):
```javascript
    const apiEndpoint = `https://${params.repo}/adobe/sites/cf/fragments/${params.fragmentId}/versions`

    // fetch content from external api endpoint
    const res = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Adobe-Accept-Unsupported-API': '1',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        label: params?.label,
        comment: params?.comment
      })
    })
    if (!res.ok) {
      throw new Error(`Request to ${apiEndpoint} failed with status code ${res.status}`)
    }
```

Update 3 (response body): 
```javascript
    const response = {
      statusCode: 200,
      body: 'Ok'
    }
```

Final file `ext/src/aem-cf-editor-1/actions/create-version/index.js`:
```javascript
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


const fetch = require('node-fetch')
const { Core } = require('@adobe/aio-sdk')
const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs } = require('../utils')

// main function that will be executed by Adobe I/O Runtime
async function main (params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })

  try {
    // 'info' is the default level if not set
    logger.info('Calling the main action')

    // log parameters, only if params.LOG_LEVEL === 'debug'
    logger.debug(stringParameters(params))

    // check for missing request input parameters and headers
    const requiredParams = ['repo', 'fragmentId']
    const requiredHeaders = ['Authorization']
    const errorMessage = checkMissingRequestInputs(params, requiredParams, requiredHeaders)
    if (errorMessage) {
      // return and log client errors
      return errorResponse(400, errorMessage, logger)
    }

    // extract the user Bearer token from the Authorization header
    const token = getBearerToken(params)

    const apiEndpoint = `https://${params.repo}/adobe/sites/cf/fragments/${params.fragmentId}/versions`

    // fetch content from external api endpoint
    const res = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Adobe-Accept-Unsupported-API': '1',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        label: params?.label,
        comment: params?.comment
      })
    })
    if (!res.ok) {
      throw new Error(`Request to ${apiEndpoint} failed with status code ${res.status}`)
    }

    const response = {
      statusCode: 200,
      body: 'Ok'
    }

    // log the response status code
    logger.info(`${response.statusCode}: successful request`)
    return response
  } catch (error) {
    // log any server errors
    logger.error(error)
    // return with 500
    return errorResponse(500, 'server error', logger)
  }
}

exports.main = main

```

CLI Commands:
```sh
aio app run
```

## Step 2.2.8 – Call runtime action on form submission 

> Updates for file `ext/src/aem-cf-editor-1/web-src/src/components/CreateversionModal.js`.

Update 1 (invoke runtime action, after import statements):
```javascript
import actionWebInvoke from "../utils";
import actionsConfig from "../config.json";

async function createVersion({
  repo,
  fragmentId,
  versionInfo,
  auth
}) {
  const resp =  await actionWebInvoke(
    actionsConfig['create-version'], 
    {
      "x-gw-ims-org-id": auth?.imsOrg,
      "Authorization": `Bearer ${auth?.imsToken}`
    },
    Object.assign({
      repo,
      fragmentId
    }, versionInfo)
  );

  if (!resp || resp.error) {
    throw new Error(resp?.error || "Version creation failed.");
  }

  return resp;
}
```

Update 2 (append body of `onCreateHandler`, line 66):
```javascript
    setSubmitted(true);

    const versionInfo = Object.fromEntries(new FormData(e.currentTarget));
    createVersion({
      repo: await guestConnection.sharedContext.get("aemHost"),
      fragmentId: (await guestConnection.host.contentFragment.getContentFragment())?.fragmentId,
      versionInfo: versionInfo,
      auth: await guestConnection.sharedContext.get("auth")
    }).then(() => {
      guestConnection.host.toaster.display({
        variant: "positive",
        message: `Version ${versionInfo.label} created!`,
        timeout: 500
      });
      guestConnection.host.modal.close();
    }).catch(e => {
      console.log(`Create version request failed!`, e);
      guestConnection.host.toaster.display({
        variant: "negative",
        message: "Unable to create new version!",
        timeout: 500
      });
      guestConnection.host.modal.close();
    });
``` 

Final file `ext/src/aem-cf-editor-1/web-src/src/components/CreateversionModal.js`:
```javascript
/*
 * <license header>
 */

import React, { useState, useEffect } from "react";
import { attach } from "@adobe/uix-guest";
import {
  Provider,
  defaultTheme,
  ProgressBar,
  Form,
  TextField,
  TextArea,
  ButtonGroup,
  Button,
} from "@adobe/react-spectrum";

import { extensionId } from "./Constants";

import actionWebInvoke from "../utils";
import actionsConfig from "../config.json";

async function createVersion({
  repo,
  fragmentId,
  versionInfo,
  auth
}) {
  const resp =  await actionWebInvoke(
    actionsConfig['create-version'], 
    {
      "x-gw-ims-org-id": auth?.imsOrg,
      "Authorization": `Bearer ${auth?.imsToken}`
    },
    Object.assign({
      repo,
      fragmentId
    }, versionInfo)
  );

  if (!resp || resp.error) {
    throw new Error(resp?.error || "Version creation failed.");
  }

  return resp;
}

export default function () {
  const [guestConnection, setGuestConnection] = useState();
  const [submitted, setSubmitted] = useState();

  useEffect(() => {
    (async () => {
      const guestConnection = await attach({ id: extensionId });

      setGuestConnection(guestConnection);
    })();
  }, []);

  const onCloseHandler = () => {
    guestConnection.host.modal.close();
  };

  const onCreateHandler = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const versionInfo = Object.fromEntries(new FormData(e.currentTarget));
    createVersion({
      repo: await guestConnection.sharedContext.get("aemHost"),
      fragmentId: (await guestConnection.host.contentFragment.getContentFragment())?.fragmentId,
      versionInfo: versionInfo,
      auth: await guestConnection.sharedContext.get("auth")
    }).then(() => {
      guestConnection.host.toaster.display({
        variant: "positive",
        message: `Version ${versionInfo.label} created!`,
        timeout: 500
      });
      guestConnection.host.modal.close();
    }).catch(e => {
      console.log(`Create version request failed!`, e);
      guestConnection.host.toaster.display({
        variant: "negative",
        message: "Unable to create new version!",
        timeout: 500
      });
      guestConnection.host.modal.close();
    });
  };

  return (
    <Provider theme={defaultTheme} colorScheme="light">
      {guestConnection && !submitted ? (
        <Form
          validationBehavior="native"
          onSubmit={onCreateHandler}
          marginX="size-150"
        >
          <TextField name="label" label="Label" isRequired />

          <TextArea name="comment" label="Comment" />

          <ButtonGroup align="end">
            <Button type="reset" variant="action" onClick={onCloseHandler}>
              Close
            </Button>

            <Button type="submit" variant="cta">
              Create
            </Button>
          </ButtonGroup>
        </Form>
      ) : (
        <ProgressBar
          label={submitted ? "Creating..." : "Connecting..."}
          isIndeterminate
        />
      )}
    </Provider>
  );
}
```

## Step 2.3.1 – Deploy and preview extension 

CLI Commands:
```sh
aio app use -w Production
aio app deploy
```

## Step 3.2.2 – Create event handler in App Builder 

CLI Commands:
```sh
aio app use –w Stage 
aio login -f 
aio app add event 
```

Action name:
```
auto-version
```

Event Registration Name:
```
Event Registration l425extXX // replace xx with your workstation number
```

Registration created for:
```
Registration for l425extXX // replace xx with your workstation number
```

## Step 3.2.3 – Deploy event handler 

CLI Commands:
```sh
aio app deploy 
```

Step 3.2.5 – Implement event handler 

> Updates in file `ext/actions/auto-version/index.js`.

Update 1 (line 18):
```javascript
const { context, getToken } = require('@adobe/aio-lib-ims') 
```

Update 2 (line 20):
```javascript
const { context, getToken } = require('@adobe/aio-lib-ims')
```

Update 3 (line 222):
```javascript
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
```

Update 4 (line 41):
```javascript
function getAemRepoFromParams(params) {
  const env = /p\d+-e\d+/.exec(params.source);
  if (env === null) {
    throw new Error(`Unexpected event source format: "${source}"`);
  }

  return `author-${env}.adobeaemcloud.com`;
}
```

Update 5 (line 50):
```javascript
function getFragmentIdFromParams(params) {
  const fragmentId = params?.data?.id;
  if (!fragmentId) {
    throw new Error(`Unable to define content fragment id.`);
  }

  return fragmentId;
}
```

Update 6 (line 59):
```javascript
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
```

Update 7 (line 83):
```javascript
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
```

Update 8 (replace from the line 105 to the end of the file):
```javascript
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
```

Final file `ext/actions/auto-version/index.js`:
```javascript
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

```

> Updates fro file `ext/app.config.yaml`.

Update 1 (add after line 24):
```yaml
                AUTOVERSION_THRESHOLD: $AUTOVERSION_THRESHOLD
                AEM_LOCAL_TOKEN: $AEM_LOCAL_TOKEN
                AEM_TECHNICAL_ACCOUNT_ORG: $AEM_TECHNICAL_ACCOUNT_ORG
                AEM_TECHNICAL_ACCOUNT_ID: $AEM_TECHNICAL_ACCOUNT_ID
                AEM_TECHNICAL_ACCOUNT_CLIENT_ID: $AEM_TECHNICAL_ACCOUNT_CLIENT_ID
                AEM_TECHNICAL_ACCOUNT_CLIENT_SECRET: $AEM_TECHNICAL_ACCOUNT_CLIENT_SECRET
                AEM_TECHNICAL_ACCOUNT_PRIVATE_KEY: $AEM_TECHNICAL_ACCOUNT_PRIVATE_KEY
```

Final file  `ext/app.config.yaml`:
```yaml
extensions:
  aem/cf-editor/1:
    $include: src/aem-cf-editor-1/ext.config.yaml
    runtimeManifest:
      packages:
        ext:
          license: Apache-2.0
          actions:
            create-version:
              function: src/aem-cf-editor-1/actions/create-version/index.js
              web: 'yes'
              runtime: nodejs:18
              inputs:
                LOG_LEVEL: debug
              annotations:
                require-adobe-auth: true
                final: true
            auto-version:
              function: actions/auto-version/index.js
              web: 'no'
              runtime: nodejs:18
              inputs:
                LOG_LEVEL: debug
                AUTOVERSION_THRESHOLD: $AUTOVERSION_THRESHOLD
                AEM_LOCAL_TOKEN: $AEM_LOCAL_TOKEN
                AEM_TECHNICAL_ACCOUNT_ORG: $AEM_TECHNICAL_ACCOUNT_ORG
                AEM_TECHNICAL_ACCOUNT_ID: $AEM_TECHNICAL_ACCOUNT_ID
                AEM_TECHNICAL_ACCOUNT_CLIENT_ID: $AEM_TECHNICAL_ACCOUNT_CLIENT_ID
                AEM_TECHNICAL_ACCOUNT_CLIENT_SECRET: $AEM_TECHNICAL_ACCOUNT_CLIENT_SECRET
                AEM_TECHNICAL_ACCOUNT_PRIVATE_KEY: $AEM_TECHNICAL_ACCOUNT_PRIVATE_KEY
              annotations:
                require-adobe-auth: false
                final: true
    events:
      registrations:
        Event Registration l425ext00:
          description: Registration for l425ex00
          events_of_interest:
            - provider_metadata: aemsites
              event_codes:
                - aem.sites.contentFragment.modified
          runtime_action: ext/auto-version
```

> Updates for file `ext/.env`

```sh
AUTOVERSION_THRESHOLD=60

AEM_LOCAL_TOKEN="<AEM LOCAL TOKEN>"
# AEM_TECHNICAL_ACCOUNT_ORG=
# AEM_TECHNICAL_ACCOUNT_ID=
# AEM_TECHNICAL_ACCOUNT_CLIENT_ID=
# AEM_TECHNICAL_ACCOUNT_CLIENT_SECRET=
# AEM_TECHNICAL_ACCOUNT_PRIVATE_KEY=
```