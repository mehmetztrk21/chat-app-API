import bcryptjs from "bcryptjs";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
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
};
export const login=async(req:any,res:any,next:any)=>{
    const email=req.body.email;
    const password=req.body.password;
    try {
        const user:any=await User.findOne({where:{email:email}});
        if(user){
            const isEqual=await bcryptjs.compare(password,user.password);
            if(isEqual){
                const token=jwt.sign(
                    {
                        user:user
                    },
                    "somesupersecretsecret",
                    {expiresIn:"1h"}
                );
                return res.status(200).json({token:token,userId:user.id});
            }
            res.status(401).json("Password not correct");
        }
        res.status(401).json("Email not correct");
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}