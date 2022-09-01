import { Message } from "../models/message";
import { Op } from "sequelize";
import { User } from "../models/user";
const io = require('../socket');

type messageBody = { reciverId: number, content: string }
type message = { id: number, reciverId: number, senderId: number, content: string, createdAt: Date }
export const messageList = async (req: any, res: any, next: any) => {
    const userId = req.session.userId;
    try {
        const messages: any = await Message.findAll({ where: { [Op.or]: [{ senderId: userId }, { reciverId: userId }] }, order: [["createdAt", "desc"]] });
        let ids: any = [];
        let msgs: any = [];
        for (const item of messages) {
            if (item.reciverId != userId || item.senderId != userId) {
                if (!ids.find((i: any) => i == item.reciverId) || !ids.find((i: any) => i == item.senderId)) {
                    ids.push(item.reciverId, item.senderId);
                    msgs.push(item.dataValues);
                }
            }
        }
        for (const id of ids) {
            if (id != userId) {
                const user: any = await User.findByPk(id);
                const index = msgs.findIndex((i: any) => i.reciverId == id || i.senderId == id);
                msgs[index] = ({ ...msgs[index], user: user });
            }
        }

        res.status(200).json({ messages: msgs });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
export const createMessage = async (req: any, res: any, next: any) => {
    const body = req.body as messageBody;
    const userId = req.session.userId;
    try {
        const new_msg = await Message.create({ ...body, senderId: userId });
        io.getIO().emit("posts", { action: "create", msg: new_msg });
        res.status(201).json("Message forwarded.");
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export const removeMessage = async (req: any, res: any, next: any) => {
    const id = req.params.id;
    try {
        const message: any = await Message.findByPk(id);
        if (message) {
            await message.destroy();
            io.getIO().emit("posts", { action: "delete" });
            res.status(200).json({message:"Message deleted."});
        }
        else {
            res.status(404).json({ message: "Message not found." });
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}

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
