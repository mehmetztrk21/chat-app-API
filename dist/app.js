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
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("./models/user");
const database_1 = require("./utils/database");
const auth_1 = require("./routes/auth");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.status(200).json({ message: "ok" });
});
app.use("/admin", auth_1.router);
database_1.sequelize.sync({ force: true }).then((result) => {
    return user_1.User.count();
})
    .then((res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Connection success.");
    if (res <= 0) {
        yield user_1.User.create({ name: "Mehmet", surname: "Öztürk", email: "mehmet.ztrk2134@gmail.com", password: yield bcryptjs_1.default.hash("123", 12), imageUrl: "https://pps.whatsapp.net/v/t61.24694-24/294900264_1765275973847131_6493955095488304066_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AVxIbATKQDD6kPMeF-9lokBz0IpQZU4A0AiuCA2JraqR5Q&oe=631673BD" });
    }
    app.listen(3000);
}))
    .catch((err) => { console.log(err); });