import  Sequelize  from "sequelize";
import { sequelize } from "../utils/database";

export const Message=sequelize.define("message",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    reciverId:Sequelize.INTEGER,
    senderId:Sequelize.INTEGER,
    content:Sequelize.STRING,
    date:Sequelize.DATE
})