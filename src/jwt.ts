import { auth } from 'express-oauth2-jwt-bearer';
import { env } from './env';

export const jwtCheck = auth({
    audience: env.JWT_BASE_URL,
    issuerBaseURL: env.ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256',
});
