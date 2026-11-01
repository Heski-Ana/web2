import express from 'express';
import { existingPassRouter } from './existing-pass';
import { homeRouter } from './home';
import { infoRouter } from './info';
import { jwtCheck } from './jwt';
import { loginRouter } from './login';
import { passesRouter } from './passes';

export const app = express();

app.use(express.json());

app.use('/', loginRouter);
app.use('/', homeRouter);
app.use('/', existingPassRouter);
app.use('/', infoRouter);

app.use(jwtCheck);

app.use('/', passesRouter);

app.listen(3000, () => {
    console.log(`Pass app listening on port 3000`);
});
