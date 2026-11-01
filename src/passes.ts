import express from 'express';
import { requiredScopes } from 'express-oauth2-jwt-bearer';
import QRCode from 'qrcode';
import type { AppPass } from './generated/prisma/client.js';
import { jwtCheck } from './jwt.js';
import { custom_prisma } from './prisma.js';
export const passesRouter = express.Router();

function construct_pass_data(db_pass: AppPass) {
    return {
        id: db_pass.id,
        name: db_pass.user_name,
        document: db_pass.document_id,
        issuedAt: db_pass.time_creation,
        status: db_pass.status ? 'ACTIVE' : 'CANCELLED',
    };
}

passesRouter.get('/passes/:id', jwtCheck, requiredScopes('read:passes'), async (req, res) => {
    const pass_id: string | string[] | undefined = req.params['id'];
    if (pass_id == null || Array.isArray(pass_id)) {
        res.sendStatus(404);
        return;
    }

    const wanted_pass = await custom_prisma.appPass.findUnique({ where: { id: pass_id } });
    if (wanted_pass == null) {
        res.sendStatus(404);
        return;
    }

    const res_json = construct_pass_data(wanted_pass);
    res.send(res_json);
});

passesRouter.post('/passes', jwtCheck, requiredScopes('create:passes'), async (req, res) => {
    if (req.body.name == '' || req.body.document == '') {
        res.sendStatus(400);
        return;
    }

    const new_pass = await custom_prisma.appPass.create({
        data: {
            user_name: req.body.name,
            document_id: req.body.document,
            status: true,
        },
    });

    const info_url = req.host + '/info/' + new_pass.id;
    const pass_url = req.host + '/passes/' + new_pass.id;
    const qr = await QRCode.toBuffer(info_url, {
        type: 'png',
        width: 300,
    });

    res.location(pass_url);

    res.setHeader('Content-Type', 'image/png');
    res.status(201).send(qr);
});
