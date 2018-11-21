let Config;
try {
    Config = require('./client_config')
} catch{
    throw new Error('Client config not found.');
}

const fullPath = path => `${Config.HOST}${path}`;

const uri_authToken = fullPath('/auth/token/');


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

        return data;
    }
};
