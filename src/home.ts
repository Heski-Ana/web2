import express from 'express';
import QRCode from 'qrcode';
import { custom_prisma } from './prisma';

export const homeRouter = express.Router();

homeRouter.get('/', async (req, res) => {
    const all_passes = await custom_prisma.appPass.count();

    const active_passes = await custom_prisma.appPass.count({ where: { status: true } });

    if (!req.oidc.isAuthenticated()) {
        res.render('index.ejs', { all_passes, active_passes });
        return;
    }

    const current_user = req.oidc.user;

    const current_passes = await custom_prisma.appPass.findMany();
    let mapped_qrs = await Promise.all(
        current_passes.map(async (pass) => {
            const wanted_url = req.host + '/info/' + pass.id;
            const qr = await QRCode.toDataURL(wanted_url);

            return { qr, pass: pass };
        })
    );

    res.render('signed_in_user.ejs', { all_passes, active_passes, current_user, mapped_qrs });
});
