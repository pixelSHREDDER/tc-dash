const BASE_URLS = {
    'local': 'localhost:3000',
};
const DATA_URLS = {
    'local': 'localhost:3001/api',
};

export const AUTH0 = {    
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    callbackUrl: `${window.location.origin}/callback`,
    returnTo: `${window.location.origin}`,
    responseType: 'token id_token',
    scope: 'openid profile email',
};

export const DEBUG = process.env !== 'prod';

export const SUPPORT = {
    email: process.env.REACT_APP_SUPPORT_EMAIL,
};

export const URLS = {
    baseUrl: BASE_URLS[process.env.REACT_APP_ENV],
    dataUrl: DATA_URLS[process.env.REACT_APP_ENV]
};