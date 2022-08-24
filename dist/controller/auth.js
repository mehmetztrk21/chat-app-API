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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    body.password = yield bcryptjs_1.default.hash(body.password, 12);
    try {
        yield user_1.User.create(Object.assign({}, body));
        res.status(201).json({ message: "User create success." });
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
});
exports.signUp = signUp;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = yield user_1.User.findOne({ where: { email: email } });
        if (user) {
            const isEqual = yield bcryptjs_1.default.compare(password, user.password);
            if (isEqual) {
                const token = jsonwebtoken_1.default.sign({
                    user: user
                }, "somesupersecretsecret", { expiresIn: "1h" });
                return res.status(200).json({ token: token, userId: user.id });
            }
            res.status(401).json("Password not correct");
        }
        res.status(401).json("Email not correct");
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
});
exports.login = login;
