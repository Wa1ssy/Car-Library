import {DataTypes, where} from "sequelize";
import {sequelize} from './dbConfig.js';
import dotenv from "dotenv";
dotenv.config();

const Cars = sequelize.define(
    "Car",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }
);
console.log("SYNC", process.env.DB_SYNC === "true");
if (process.env.DB_SYNC === "true") {
    await sequelize.sync();
    console.log("SEED", process.env.DB_SEED === "true");
    if(process.env.DB_SEED === "true") {
        await Cars.findOrCreate({
           where: { name: "BMW"},
            defaults: { name: "BMW"},
        });
    }
}

export default Cars;