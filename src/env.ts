import dotenv from 'dotenv';
import { cleanEnv, port, str, url } from 'envalid';

dotenv.config();

export const server_env = cleanEnv(process.env, {
    DATABASE_URL: url(),

    ISSUER_BASE_URL: url(),

    JWT_CLIENT_ID: str(),
    JWT_CLIENT_SECRET: str(),
    JWT_SECRET: str(),

    OPEN_ID_SECRET: str(),
    OPEN_ID_CLIENT_ID: str(),

    OPEN_ID_BASE_URL: url(),
    JWT_BASE_URL: url(),
    PORT: port(),

    RENDER_EXTERNAL_URL: url(),
});
