import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize('houlak-app', process.env.DB_USERNAME as string, process.env.DB_PASSWORD as string, {
    host: 'localhost',
    dialect: 'mysql',
});

export default db;