import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const User = db.define('note', {
    judul: DataTypes.STRING,
    kategori: DataTypes.STRING,
    isi: DataTypes.STRING
}, {
    freezeTableName: true
});
export default User;
(async () => {
    await db.sync();
})();