import dotenv from 'dotenv';
import { cleanEnv, port, str, url } from 'envalid';
import fs from 'fs';

dotenv.config();

export const env = cleanEnv(process.env, {
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
});

export async function getToken(authority: string, audience: string, clientId: string, clientSecret: string, scope: string): Promise<string> {
    const token_url = authority + '/oauth/token';
    const payload = {
        audience: audience,
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        scope: scope,
    };

    try {
        const response = await fetch(token_url, {
            method: 'POST',
            headers: { 'cache-control': 'no-cache', 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const jsonData = await response.json();
        if (jsonData.access_token == null) {
            console.log(jsonData);
            return '';
        }

        return jsonData.access_token;
    } catch {
        return '';
    }
}

export async function issuePass(url: string, token: string, name: string, document: string): Promise<void> {
    const payload = {
        name: name,
        document: document,
    };

    const authorization = `Bearer ${token}`;
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json', authorization: authorization },
    });

    if (response.status != 201) {
        console.log(`Failed to create pass got status ${response.status}`);
        return;
    }

    const arrayBuffer = await response.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);
    const header_location = response.headers.get('location');
    const split_location = header_location?.split('/') ?? [];
    const pass_id = split_location.at(split_location?.length - 1);
    const file_path = `${pass_id}.png`;
    fs.writeFileSync(file_path, buffer);
    console.log(`Created QR code file at ${file_path}, got location ${header_location}`);
}

async function main() {
    const base_url = env.JWT_BASE_URL;

    const authority = env.ISSUER_BASE_URL;
    const audience = base_url;
    const clientId = env.JWT_CLIENT_ID;
    const clientSecret = env.JWT_CLIENT_SECRET;
    const scope = 'create:passes';

    const token = await getToken(authority, audience, clientId, clientSecret, scope);
    if (token == '') {
        console.log('Failed to get token');
    }

    const url = 'http://' + base_url + '/passes';
    const name = 'a';
    const document = 'a';

    await issuePass(url, token, name, document);
}

main();
