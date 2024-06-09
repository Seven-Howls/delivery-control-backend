import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    define: {
        underscored: true
    },
    logging: true,
    pool: {
        min: 0,
        max: 20
    }
});
