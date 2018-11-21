const CLIENT_ID = "OKe9Ls6EVh7UDFW56w95y7UKITeHooWJP72UaZBa";
const GRANT_TYPE = 'password';

const HOST = 'https://api-staging.revcascade.com';
const uri_authToken = `${HOST}/auth/token/`;

export default {
    getAuthToken: async (email, password) => {

        let fd = new FormData();
        fd.append('client_id', CLIENT_ID);
        fd.append('grant_type', GRANT_TYPE);
        fd.set('username', email);
        fd.set('password', password);

        let res = await fetch(uri_authToken, {  
            method: 'POST',
            body: fd
        })
        let data = await res.json();

        return data;
    }
};
