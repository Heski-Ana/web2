import express from 'express';
import QRCode from 'qrcode';
import { custom_prisma } from './prisma.js';

export const infoRouter = express.Router();

infoRouter.get('/info/:id', async (req, res) => {
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

    const wanted_url = req.host + '/info/' + wanted_pass.id;
    const qr = await QRCode.toDataURL(wanted_url);

    res.render('info.ejs', { qr: { qr, pass: wanted_pass } });
});
