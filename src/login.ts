import express from 'express';
import { auth } from 'express-openid-connect';
import { env } from './env';
export const loginRouter = express.Router();

loginRouter.use(
    auth({
        authRequired: false, // set to true to require authentication for all routes
        auth0Logout: true,
        secret: env.OPEN_ID_SECRET,
        baseURL: env.OPEN_ID_BASE_URL,
        clientID: env.OPEN_ID_CLIENT_ID,
        issuerBaseURL: env.ISSUER_BASE_URL,
    })
);

loginRouter.get('/signup', (req, res) =>
    res.oidc.login({
        returnTo: '/',
        authorizationParams: { screen_hint: 'signup' },
    })
);
