import { DataTypes } from "sequelize";
import { sequelize } from './dbConfig.js';


    const Users = sequelize.define(
        "User",
        {
            username: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    );
export default Users;