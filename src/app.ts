import bodyParser from "body-parser";
import express from "express";
import bcryptjs from "bcryptjs"
import { User } from "./models/user";
import { sequelize } from "./utils/database";
import { router as authRoutes } from "./routes/auth";
const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(200).json({ message: "ok" });
});

app.use("/admin",authRoutes);

sequelize.sync({ force:true }).then((result: any) => {
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

