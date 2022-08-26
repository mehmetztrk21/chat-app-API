import bodyParser from "body-parser";
import express from "express";
import bcryptjs from "bcryptjs"
import { User } from "./models/user";
import { sequelize } from "./utils/database";
import { router as authRoutes } from "./routes/auth";
import {router as messageRoutes} from "./routes/message";
import { Message } from "./models/message";
const session=require('express-session');

const app = express();
app.use(bodyParser.json());
app.use(session({secret:"my secret",resave:false,saveUnitialized:false}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.get("/", (req, res) => {
    res.status(200).json({ message: "ok" });
});

app.use("/admin",authRoutes);
app.use("/message",messageRoutes);

sequelize.sync().then((result: any) => {
    return User.count();
})
    .then(async (res: any) => {
        console.log("Connection success.");
        if (res <= 0) {
            await User.create({ name: "Mehmet", surname: "Öztürk", email: "mehmet.ztrk2134@gmail.com", password: await bcryptjs.hash("123", 12), imageUrl: "https://pps.whatsapp.net/v/t61.24694-24/294900264_1765275973847131_6493955095488304066_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AVxIbATKQDD6kPMeF-9lokBz0IpQZU4A0AiuCA2JraqR5Q&oe=631673BD" })
        }
        app.listen(3000);
    })
    .catch((err: any) => { console.log(err) });

