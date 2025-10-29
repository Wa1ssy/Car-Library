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
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        model: {
            type: DataTypes.STRING,
        },
        releaseDate:{
            type: DataTypes.DATE,
        },
        price: {
            type: DataTypes.DECIMAL(10,2),
        }
    }
);
if (process.env.DB_SYNC === "true") {
    await sequelize.sync();
    if(process.env.DB_SEED === "true") {
        await Cars.findOrCreate({
           where: {
                name: "BMW"},
                defaults: { name: "BMW",
                module: "M5 e60",
                releaseDate: new Date("2003-06-05T00:00:00.000Z"),
                price: "15000"
            },
        });
    }
}

export default Cars;