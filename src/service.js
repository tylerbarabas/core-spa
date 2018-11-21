const CLIENT_ID = "OKe9Ls6EVh7UDFW56w95y7UKITeHooWJP72UaZBa";
const SECRET = "QaEbVIlHqV3MrHxK8znsdjIoCDwdluERIvwYNvW7bZ8QH9rxe2Ga5D3U5aSNSDPnkpag1GkaBBRSR8QnQP8BLXDJxBGyeYgnc3HrQfJFh4YsmRt5apnzpfN9FCgsFiWV";
const GRANT_TYPE = 'password';

const HOST = 'https://api-staging.revcascade.com';
const uri_authToken = `${HOST}/auth/token/`;

export default {
    getAuthToken: async () => {
        let fd = new FormData();
        fd.append('client_id', CLIENT_ID);
        fd.append('grant_type', 'password');
        fd.set('username', 'tyler@revcascade.com');
        fd.set('password', 'makemoney');

        let res = await fetch(uri_authToken, {  
            method: 'POST',
            body: fd
        })
        let data = await res.json();

        return data;
    }
};
