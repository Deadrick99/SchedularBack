import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
require("dotenv")
const prisma = new PrismaClient()

const checkUsername = async(req:Request, res:Response) =>{
 const duplicate = await prisma.employee.findFirst({
        where:{
            userName:req.body.userName
        }
    })
    if(duplicate) {
        return res.status(409).json({message : "User name already exists please choose a different one."})
    }
    else return res.status(200).json(req.body.userName);
};

module.exports = checkUsername
