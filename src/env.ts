import dotenv from 'dotenv';
import { cleanEnv, port, str, url } from 'envalid';

dotenv.config();

export const server_env = cleanEnv(process.env, {
    DATABASE_URL: url(),

    authority: url(),

    client_id: str(),
    client_secret: str(),

    OPEN_ID_SECRET: str(),
    OPEN_ID_CLIENT_ID: str(),

    OPEN_ID_BASE_URL: url(),
    audience: url(),
    PORT: port(),

    RENDER_EXTERNAL_URL: url(),
});
