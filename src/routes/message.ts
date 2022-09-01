import { Router } from "express";
import { chat, createMessage, messageList, removeMessage } from "../controller/message";
import { isAuth } from "../middleware/isAuth";

export const router=Router();

router.get("/list",isAuth,messageList);
router.post("/send",isAuth,createMessage);
router.post("/chat",isAuth,chat);
router.post("/delete/:id",isAuth,removeMessage);