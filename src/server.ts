import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

const port = process.env.API_PORT || 3000;
app.listen(port,() => {
    console.log(`Server init in http://localhost:${port}`);
})
