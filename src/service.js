let Config;
try {
    Config = require('./client_config').default
} catch{
    throw new Error('Client config not found.');
}

const fullPath = path => `${Config.HOST}${path}`;

const uri_authToken = fullPath('/auth/token/');
const uri_getMyUser = fullPath('/v1/users/me/');

let Auth = {
    accessToken: null,
    tokenType: null
};

const getAuthHeaders = () => ({'Authorization': `${Auth.tokenType} ${Auth.accessToken}`});

export default {
    getAuthToken: async (email, password) => {

        let fd = new FormData();
        fd.append('client_id', Config.CLIENT_ID);
        fd.append('grant_type', Config.GRANT_TYPE);
        fd.set('username', email);
        fd.set('password', password);

        let res = await fetch(uri_authToken, {  
            method: 'POST',
            body: fd
        })

        let data = await res.json();

        Auth.accessToken = data.access_token;
        Auth.tokenType = data.token_type;

        return data;
    },
    getMyUser: async () => {
        let res = await fetch(uri_getMyUser, {
            headers: getAuthHeaders()
        });

        return await res.json();
    }
};
