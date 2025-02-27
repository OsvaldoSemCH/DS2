import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/user.ts";

export function JwtAuth(req : Request, res : Response, next : NextFunction)
{

}

export function VerifyRegister(req : Request, res : Response, next : NextFunction)
{
    const Data : IUser = req.body;
    if(!Data.password || !Data.name || !Data.email)
    {
        res.status(400).send({message: "Dados incompletos"})
        return;
    }
    next();
}
export function VerifyLogin(req : Request, res : Response, next : NextFunction)
{
    const {email,password} = req.body;
    if(!password || !email)
    {
        res.status(400).send({message: "Dados incompletos"})
        return;
    }
    next();
}