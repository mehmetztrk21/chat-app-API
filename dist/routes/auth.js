"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_1 = require("../controller/auth");
exports.router = (0, express_1.Router)();
exports.router.post("/signup", auth_1.signUp);
exports.router.post("/login", auth_1.login);
exports.router.post("/getUser", auth_1.findByPk);
