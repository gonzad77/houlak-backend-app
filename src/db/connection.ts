import { Sequelize } from 'sequelize';

const db = new Sequelize('houlak-app', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

export default db;