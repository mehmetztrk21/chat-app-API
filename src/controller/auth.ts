import bcryptjs from "bcryptjs";
import { User } from "../models/user";
type signUpBody = { name: string, surname: string, email: string, password: string, imageUrl: string };
export const signUp = async (req: any, res: any, next: any) => {
    const body = req.body as signUpBody;
    body.password = await bcryptjs.hash(body.password, 12);
    try {
        await User.create({ ...body });
        res.status(201).json({ message: "User create success." });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}