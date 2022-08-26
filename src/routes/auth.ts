import { Router } from "express";
import { findByPk, login, signUp } from "../controller/auth";

export const router=Router();

router.post("/signup",signUp);

router.post("/login",login);

router.post("/getUser",findByPk);