/*const {
    REACT_APP_AUTH0_DOMAIN: AUTH0_DOMAIN = '',
    REACT_APP_AUTH0_CLIENT_ID: AUTH0_CLIENT_ID = '',
    REACT_APP_ENV: ENV = '',
} = process.env;*/
const BASE_URLS = {
    'local': 'localhost:3000',
};
const DATA_URLS = {
    'local': 'localhost:3001/api',
};

const config = {
    AUTH0: {    
        //domain: AUTH0_DOMAIN,
        domain: process.env.REACT_APP_AUTH0_DOMAIN,
        //audience: `https://${AUTH0_DOMAIN}/userinfo`,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        //clientID: AUTH0_CLIENT_ID,
        clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
        callbackUrl: `${window.location.origin}/callback`,
        returnTo: `${window.location.origin}`,
        responseType: 'token id_token',
        scope: 'openid profile email',
    }
};

export default config;

export const URLS = {
    /*baseUrl: BASE_URLS[ENV],
    dataUrl: DATA_URLS[ENV]*/
    baseUrl: BASE_URLS[process.env.REACT_APP_ENV],
    dataUrl: DATA_URLS[process.env.REACT_APP_ENV]
};