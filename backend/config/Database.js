import { Sequelize } from "sequelize";

const db = new Sequelize('crud_tugas2', 'root', '', {
    host: '35.225.207.4',
    dialect: 'mysql',
    port: 3306,
    logging: false
});

export default db;