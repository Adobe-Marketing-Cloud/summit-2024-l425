let serviceToken;
let running = false;

const REACT_APP_HOST_URI = "https://author-p7452-e1304448.adobeaemcloud.com";

self.addEventListener("install", event => {
    self.skipWaiting();
});

async function getServiceToken() {
    if (running) {
        await new Promise(r => setTimeout(r, 100));
        return;
    }
    running = true;
    if (!serviceToken) {
        const resp = await fetch("/api/v1/web/securbank/getTechAccount");
        const json = await resp.json();
        serviceToken = json.token;
    }
    running=false;
}

getServiceToken();

self.addEventListener('fetch', async function (event) {
    while (! serviceToken) {
        await getServiceToken();
    }

    if ( event.request?.url?.startsWith(REACT_APP_HOST_URI)) {
        if ( !event.request.headers.has("authorization")) {
            event.respondWith( fetch(event.request, {
                credentials: 'include',
                headers: { authorization: `Bearer ${serviceToken}`},
                mode: "cors"
            }));
        }
    }
});
