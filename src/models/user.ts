import Sequelize from "sequelize";
import { sequelize } from "../utils/database";


export const User=sequelize.define("users",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:Sequelize.STRING,
    surname:Sequelize.STRING,
    email:Sequelize.STRING,
    password:Sequelize.STRING,
    imageUrl:Sequelize.STRING
})