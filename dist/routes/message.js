"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const message_1 = require("../controller/message");
const isAuth_1 = require("../middleware/isAuth");
exports.router = (0, express_1.Router)();
exports.router.get("/list", isAuth_1.isAuth, message_1.messageList);
exports.router.post("/send", isAuth_1.isAuth, message_1.createMessage);
exports.router.post("/chat", isAuth_1.isAuth, message_1.chat);
