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
                model: "e46",
                releaseDate: new Date("1998-04-28T00:00:00.000Z"),
                price: "4500"
            },
        });
    }
}

export default Cars;