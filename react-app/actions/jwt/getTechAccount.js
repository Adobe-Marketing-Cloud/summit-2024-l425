/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const  authorize  = require ("@adobe/jwt-auth");
const { Core } = require("@adobe/aio-sdk");

async function main (params) {
    const {SERVICE_TOKEN, LOG_LEVEL} = params;
    const logger = Core.Logger("main", { level: LOG_LEVEL || "info" })

    if ( !SERVICE_TOKEN ) {
        return {
            statusCode: 500,
            body: "SERVICE_TOKEN not configured"
        }
    }

    const serviceCredentials = SERVICE_TOKEN.integration;
    const { access_token } = await authorize({
        clientId: serviceCredentials.technicalAccount.clientId, // Client Id
        technicalAccountId: serviceCredentials.id,              // Technical Account Id
        orgId: serviceCredentials.org,                          // Adobe IMS Org Id
        clientSecret: serviceCredentials.technicalAccount.clientSecret, // Client Secret
        privateKey: serviceCredentials.privateKey,              // Private Key to sign the JWT
        metaScopes: serviceCredentials.metascopes.split(','),   // Meta Scopes defining level of access the access token should provide
        ims: `https://${serviceCredentials.imsEndpoint}`,       // IMS endpoint used to obtain the access token from
    });

    return {
        statusCode: 200,
        headers: {
            "content-type": "application/json"
        },
        body: `{"token": "${access_token}"}`
    }
}

exports.main = main
