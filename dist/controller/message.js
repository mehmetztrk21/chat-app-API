"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chat = exports.removeMessage = exports.createMessage = exports.messageList = void 0;
const message_1 = require("../models/message");
const sequelize_1 = require("sequelize");
const user_1 = require("../models/user");
const io = require('../socket');
const messageList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.session.userId;
    try {
        const messages = yield message_1.Message.findAll({ where: { [sequelize_1.Op.or]: [{ senderId: userId }, { reciverId: userId }] }, order: [["createdAt", "desc"]] });
        let ids = [];
        let msgs = [];
        for (const item of messages) {
            if (item.reciverId != userId || item.senderId != userId) {
                if (!ids.find((i) => i == item.reciverId) || !ids.find((i) => i == item.senderId)) {
                    ids.push(item.reciverId, item.senderId);
                    msgs.push(item.dataValues);
                }
            }
        }
        for (const id of ids) {
            if (id != userId) {
                const user = yield user_1.User.findByPk(id);
                const index = msgs.findIndex((i) => i.reciverId == id || i.senderId == id);
                msgs[index] = (Object.assign(Object.assign({}, msgs[index]), { user: user }));
            }
        }
        res.status(200).json({ messages: msgs });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
exports.messageList = messageList;
const createMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const userId = req.session.userId;
    try {
        const new_msg = yield message_1.Message.create(Object.assign(Object.assign({}, body), { senderId: userId }));
        io.getIO().emit("posts", { action: "create", msg: new_msg });
        res.status(201).json("Message forwarded.");
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
exports.createMessage = createMessage;
const removeMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const message = yield message_1.Message.findByPk(id);
        if (message) {
            yield message.destroy();
            io.getIO().emit("posts", { action: "delete" });
            res.status(200).json("Message deleted.");
        }
        else {
            res.status(404).json({ message: "Message not found." });
        }
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
exports.removeMessage = removeMessage;
const chat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const chatUser = req.body.userId;
    const userId = req.session.userId;
    try {
        const messages = yield message_1.Message.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        [sequelize_1.Op.and]: [
                            { senderId: userId }, { reciverId: chatUser }
                        ]
                    },
                    {
                        [sequelize_1.Op.and]: [
                            { senderId: chatUser }, { reciverId: userId }
                        ]
                    }
                ]
            },
            order: [["createdAt", "asc"]]
        });
        res.status(200).json({ messages: messages });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
exports.chat = chat;
