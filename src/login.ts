import express from 'express';
import { auth } from 'express-openid-connect';
import { server_env } from './env.js';
export const loginRouter = express.Router();

loginRouter.use(
    auth({
        authRequired: false, // set to true to require authentication for all routes
        auth0Logout: true,
        secret: server_env.OPEN_ID_SECRET,
        baseURL: server_env.OPEN_ID_BASE_URL,
        clientID: server_env.OPEN_ID_CLIENT_ID,
        issuerBaseURL: server_env.authority,
    })
);

loginRouter.get('/signup', (_req, res) =>
    res.oidc.login({
        returnTo: '/',
        authorizationParams: { screen_hint: 'signup' },
    })
);
