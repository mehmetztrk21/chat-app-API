import { Router } from "express";
import { signUp } from "../controller/auth";

export const router=Router();

router.post("/signup",signUp);