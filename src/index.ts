import express from 'express';
import { server_env } from './env.js';
import { existingPassRouter } from './existing-pass.js';
import { homeRouter } from './home.js';
import { infoRouter } from './info.js';
import { jwtCheck } from './jwt.js';
import { loginRouter } from './login.js';
import { passesRouter } from './passes.js';

export const app = express();

app.use(express.json());

app.use('/', loginRouter);
app.use('/', homeRouter);
app.use('/', existingPassRouter);
app.use('/', infoRouter);

app.use(jwtCheck);

app.use('/', passesRouter);

const externalUrl = server_env.RENDER_EXTERNAL_URL;
const port = externalUrl && server_env.PORT ? server_env.PORT : 3000;
const baseURL = externalUrl || `http://localhost:${port}`;
const hostname = externalUrl ? '0.0.0.0' : '127.0.0.';

app.listen(port, hostname, () => {
    console.log(`Server locally running at ${baseURL}`);
    if (externalUrl) {
        console.log(`External URL: ${externalUrl}`);
    }
});
