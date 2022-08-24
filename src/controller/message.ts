import { Message } from "../models/message";
import { Op } from "sequelize";
import { User } from "../models/user";

type messageBody = { reciverId: number, content: string }

export const messageList = async (req: any, res: any, next: any) => {
    console.log("hghg", req.session);
    const userId = req.session.userId;
    try {
        const messages: any = await Message.findAll({ where: { [Op.or]: [{ senderId: userId }, { reciverId: userId }] }, order: [["createdAt", "desc"]] });
        res.status(200).json({ messages: messages });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
export const createMessage = async (req: any, res: any, next: any) => {
    const body = req.body as messageBody;
    const userId = req.session.userId;
    try {
        await Message.create({ ...body, senderId: userId });
        res.status(201).json("Message forwarded.");
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
export const chat = async (req: any, res: any, next: any) => {
    const chatUser = req.body.userId;
    const userId = req.session.userId;
    try {
        const messages: any = await Message.findAll({
            where: {
                [Op.or]: [
                    {
                        [Op.and]: [
                            { senderId: userId }, { reciverId: chatUser }
                        ]
                    },
                    {
                        [Op.and]: [
                            { senderId: chatUser }, { reciverId: userId }
                        ]
                    }
                ]
            }
            , order: [["createdAt", "asc"]]
        });
        res.status(200).json({ messages: messages });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
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