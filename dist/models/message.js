"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const types_1 = __importDefault(require("sequelize/types"));
const database_1 = require("../utils/database");
exports.Message = database_1.sequelize.define("message", {
    id: {
        type: types_1.default.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    reciverId: types_1.default.INTEGER,
    senderId: types_1.default.INTEGER,
    content: types_1.default.STRING,
    date: types_1.default.DATE
});
