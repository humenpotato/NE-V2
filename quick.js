window.onload = function () {

    document.getElementById('authorize_button').addEventListener('click', handleAuthClick);
    document.getElementById('signout_button').addEventListener('click', handleSignoutClick);
    /* exported gapiLoaded */
    /* exported gisLoaded */
    /* exported handleAuthClick */
    /* exported handleSignoutClick */

    // TODO(developer): Set to client ID and API key from the Developer Console
    const apiLink = "https://sheets.googleapis.com/$discovery/rest?version=v4"
    const CLIENT_ID = '121073869918-qlf8q36d89ies1hgnqg16nqrgef1t747.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyB9EdKUfLWXRmpC31eBn2BshC3f4-H-xac';

    // Discovery doc URL for APIs used by the quickstart
    const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

    let tokenClient;
    let gapiInited = false;
    let gisInited = false;

    document.getElementById('authorize_button').style.visibility = 'hidden';
    document.getElementById('signout_button').style.visibility = 'hidden';

    /**
     * Callback after api.js is loaded.
     */
    function gapiLoaded() {
        gapi.load('client', initializeGapiClient);
    }

    /**
     * Callback after the API client is loaded. Loads the
     * discovery doc to initialize the API.
     */
    async function initializeGapiClient() {
        await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
        });
        gapiInited = true;
        maybeEnableButtons();
    }

    /**
     * Callback after Google Identity Services are loaded.
     */
    function gisLoaded() {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: '', // defined later
        });
        gisInited = true;
        maybeEnableButtons();
    }

    /**
     * Enables user interaction after all libraries are loaded.
     */
    function maybeEnableButtons() {
        if (gapiInited && gisInited) {
            document.getElementById('authorize_button').style.visibility = 'visible';
        }
    }

    /**
     *  Sign in the user upon button click.
     */
    function handleAuthClick() {
        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
                throw (resp);
            }
            document.getElementById('signout_button').style.visibility = 'visible';
            document.getElementById('authorize_button').innerText = 'Refresh';
            await listMajors();
        };

        if (gapi.client.getToken() === null) {
            // Prompt the user to select a Google Account and ask for consent to share their data
            // when establishing a new session.
            tokenClient.requestAccessToken({ prompt: 'consent' });
        } else {
            // Skip display of account chooser and consent dialog for an existing session.
            tokenClient.requestAccessToken({ prompt: '' });
        }
    }

    /**
     *  Sign out the user upon button click.
     */
    function handleSignoutClick() {
        const token = gapi.client.getToken();
        if (token !== null) {
            google.accounts.oauth2.revoke(token.access_token);
            gapi.client.setToken('');
            document.getElementById('content').innerText = '';
            document.getElementById('authorize_button').innerText = 'Authorize';
            document.getElementById('signout_button').style.visibility = 'hidden';
        }
    }

    /**
     * Print the names and majors of students in a sample spreadsheet:
     * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
     */
    async function listMajors() {
        let response;


        Authorization: Bearer[YOUR_ACCESS_TOKEN]
        Accept: application / json

        let spreadsheetId = '14vRWPgsx-RrfYovGqBjEFakDxOoAYYqSm8EJ9yLT75Y'
        let range = 'Source For Extention!A:B'
        let thisURL = apiLink + `/v4/spreadsheets/${spreadsheetId}/values/${range}`
        let option = {
            Headers: {}
        }


        // const apiKey = '[YOUR_API_KEY]';
        // const accessToken = '[YOUR_ACCESS_TOKEN]';

        const url = `https://sheets.googleapis.com/v4/spreadsheets/14vRWPgsx-RrfYovGqBjEFakDxOoAYYqSm8EJ9yLT75Y/values/Source%20For%20Extension!A%3AB`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Process the response data here
            })
            .catch(error => {
                console.error(error);
                // Handle any errors here
            });


        fetch()


        if (!range || !range.values || range.values.length == 0) {
            document.getElementById('content').innerText = 'No values found.';
            return;
        }
        // Flatten to string to display
        const output = range.values.reduce(
            (str, row) => `${str}${row[0]}, ${row[4]}\n`,
            'Name, Major:\n');
        document.getElementById('content').innerText = output;
    }

    // gapiLoaded()
    // gisLoaded()
}