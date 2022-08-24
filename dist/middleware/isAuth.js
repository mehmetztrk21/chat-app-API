"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        let decodedToken;
        try {
            decodedToken = jsonwebtoken_1.default.verify(token, "somesupersecretsecret");
        }
        catch (error) {
            return res.status(403).json({ message: "Not authenticated." });
        }
        if (!decodedToken) {
            return res.status(401).json({ message: "Not authenticated." });
        }
        req.session.userId = decodedToken.user.id;
        return next();
    }
    return res.status(401).json({ message: "Not authenticated." });
};
exports.isAuth = isAuth;
