import express from 'express';
import { custom_prisma } from './prisma';
export const existingPassRouter = express.Router();

existingPassRouter.post('/existing-pass/cancel', async (req, res) => {
    if (!req.oidc.isAuthenticated()) {
        res.sendStatus(401);
        return;
    }
    await custom_prisma.appPass.update({ where: { id: req.body.pass_id }, data: { status: false } });
    res.sendStatus(200);
});

existingPassRouter.post('/existing-pass/delete', async (req, res) => {
    if (!req.oidc.isAuthenticated()) {
        res.sendStatus(401);
        return;
    }
    await custom_prisma.appPass.delete({ where: { id: req.body.pass_id } });
    res.sendStatus(200);
});
