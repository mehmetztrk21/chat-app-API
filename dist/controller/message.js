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
exports.chat = exports.createMessage = exports.messageList = void 0;
const message_1 = require("../models/message");
const sequelize_1 = require("sequelize");
const messageList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hghg", req.session);
    const userId = req.session.userId;
    try {
        const messages = yield message_1.Message.findAll({ where: { [sequelize_1.Op.or]: [{ senderId: userId }, { reciverId: userId }] }, order: [["createdAt", "desc"]] });
        res.status(200).json({ messages: messages });
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
        yield message_1.Message.create(Object.assign(Object.assign({}, body), { senderId: userId }));
        res.status(201).json("Message forwarded.");
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
exports.createMessage = createMessage;
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
// export const list = async (req: any, res: any, next: any) => {
//     const chatUser = req.body.userId;
//     const userId = req.session.userId;
//     let result: any = []
//     try {
//         const msgs: any = await Message.findAll({ where: { [Op.or]: [{ senderId: userId }, { reciverId: userId }] }, order: [["createdAt", "desc"]] });
//         console.log("msqs",msgs);
//         for (const item of msgs) {
//             if (item) {
//                 const message: any = await Message.findAll({
//                     where: {
//                         [Op.or]: [
//                             {
//                                 [Op.and]: [
//                                     { senderId: userId }, { reciverId: item.reciverId }
//                                 ]
//                             },
//                             {
//                                 [Op.and]: [
//                                     { senderId: item.senderId }, { reciverId: userId }
//                                 ]
//                             }
//                         ]
//                     }
//                     , order: [["createdAt", "desc"]],
//                     limit: 1
//                 });
//                 if (message) {
//                     if (!result.find((i: any) => (i.reciverId == message.reciverId && i.senderId==message.senderId) || (i.reciverId == message.senderId && i.senderId==message.reciverId)))
//                         result.push(message);
//                 }
//             }
//         }
//         res.status(200).json({ messages: result });
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// }
