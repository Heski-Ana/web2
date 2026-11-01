import { auth } from 'express-oauth2-jwt-bearer';
import { server_env } from './env.js';

export const jwtCheck = auth({
    audience: server_env.audience,
    issuerBaseURL: server_env.authority,
    tokenSigningAlg: 'RS256',
});
