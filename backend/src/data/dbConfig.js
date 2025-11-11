import { DataTypes, Sequelize } from 'sequelize';
import CarModel from "./CarModel.js";
import UserModel from "./UserModel.js";
import CarPlayModel from "./CarPlayModel.js";
import relations from "./relations.js";
import seed from "./seed.js";
import dotenv from "dotenv";
dotenv.config();

const isTest = process.env.NODE_ENV === 'test';
console.log("isTest:", isTest);

const sequelize = isTest
  ? new Sequelize({
      dialect: "sqlite",
      storage: ":memory",
      logging: false,
      define: {
        attributes: {
            exclude: [ 'createdAt', 'updatedAt']
        }
      }
    })
  : new Sequelize({
      dialect: "sqlite",
      storage: process.env.DB_FILE,
      logging: console.log,
    });

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established.");
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
})();

const db = {};
db.Cars = CarModel(sequelize, DataTypes);
db.Users = UserModel(sequelize, DataTypes);
db.CarPlays = CarPlayModel(sequelize, DataTypes);

relations(db);

const sync = async () => {
  await sequelize.sync({ alter: true });
  console.log("All models were synchronized.");
};

if (process.env.DB_SYNC === "true") {
  await sync();
  if (process.env.DB_SEED === "true") {
    await seed(db);
  }
}

export { sequelize, sync, db };
