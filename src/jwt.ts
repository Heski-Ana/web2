import { auth } from 'express-oauth2-jwt-bearer';
import { server_env } from './env.js';

export const jwtCheck = auth({
    audience: server_env.JWT_BASE_URL,
    issuerBaseURL: server_env.ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256',
});
