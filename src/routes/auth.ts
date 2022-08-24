import { Router } from "express";
import { login, signUp } from "../controller/auth";

export const router=Router();

router.post("/signup",signUp);

router.post("/login",login);