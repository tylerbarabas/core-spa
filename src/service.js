const CLIENT_ID = "OKe9Ls6EVh7UDFW56w95y7UKITeHooWJP72UaZBa";
const SECRET = "QaEbVIlHqV3MrHxK8znsdjIoCDwdluERIvwYNvW7bZ8QH9rxe2Ga5D3U5aSNSDPnkpag1GkaBBRSR8QnQP8BLXDJxBGyeYgnc3HrQfJFh4YsmRt5apnzpfN9FCgsFiWV";
const GRANT_TYPE = 'password';

const HOST = 'https://api-staging.revcascade.com';
const uri_authToken = `${HOST}/auth/token/`;

export default {
    getAuthToken: async () => {
        let res = await fetch(uri_authToken, {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode: 'no-cors',
            body: JSON.stringify({
                'client_id': CLIENT_ID,
                'client_secret': SECRET,
                'grant_type': GRANT_TYPE
            })
        });
        console.log('res?', res);
        return res;
    }
};
