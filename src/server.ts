import { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { collaboratorRouter } from './router/collaboratorRouter';
import { deliveriesRouter } from './router/deliveriesRouter';
import { motoboyRouter } from './router/motoboyRouter';
import { paymentRouter } from './router/paymentMethod';
import { userRouter } from './router/userRouter';

dotenv.config();

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.get('/',(req: Request, res: Response)=> {
    res.status(200).send("Api rodando!")
});
app.use('/api/v1/collaborator',collaboratorRouter);
app.use('/api/v1/deliveries',deliveriesRouter);
app.use('/api/v1/motoboys', motoboyRouter);
app.use('/api/v1/payment-method', paymentRouter);
app.use('/api/v1/user', userRouter)

const port = process.env.API_PORT || 3000;

app.listen(port,() => {
    console.log(`Server init in http://localhost:${port}`);
})
