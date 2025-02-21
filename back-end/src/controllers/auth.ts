import { Request, Response } from "express";
import UserModel, { IUser } from "../models/user.ts";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";

dotenv.config();

export default class AuthController
{
    static async Register(req: Request, res: Response): Promise<void>
    {
        const Data : IUser = req.body;

        // Data.password = await bcrypt.hash(Data.password, await bcrypt.genSalt(12))
        Data.password = await CryptoJS.AES.encrypt(Data.password, process.env.SECRET as string).toString()

        const User = new UserModel(Data);
        try
        {
            await User.save();
            res.status(201).send({ message: "Usuário cadastrado com sucesso" });
        }catch(error)
        {
            res.status(500).send({ message: `${error}` });
        }
    }

    static async Login(req: Request, res: Response): Promise<void>
    {
        const {email,password} = req.body;
        const User = await UserModel.findOne({email});

        if(!User)
        {
            res.status(400).send({message:"Invalid Email or password"});
            return
        }

        //if(!await bcrypt.compare(password,User.password))
        if(CryptoJS.AES.decrypt(User.password, process.env.SECRET as string).toString(CryptoJS.enc.Utf8) != password)
        {
            res.status(400).send({message:"Invalid Email or password"});
            return
        }

        const Secret = process.env.SECRET;
        if(Secret == undefined){return;}

        const Token = jwt.sign({id:User._id,},Secret,{expiresIn:"2 days"});

        res.status(200).send({token:Token})
    }
}