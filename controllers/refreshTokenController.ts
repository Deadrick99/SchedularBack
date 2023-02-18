const jwt = require("jsonwebtoken")
import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
require("dotenv")
const prisma = new PrismaClient()

const handleRefreshToken = async(req:Request,res:Response) => {
    const cookies = req.cookies
    if(!cookies?.jwt){
         return res.sendStatus(400).json({message:"no cookies found"})
    }
    const refreshToken = cookies.jwt;
    console.log(refreshToken)
    const foundUser = await prisma.employee.findFirst({
        where:{refreshToken:refreshToken}
    })
    if(!foundUser) return res.sendStatus(403).json({message :"could not find user"}); //refresh token expired or forbidden

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err:Error, decoded:any)=> {
        if(err || foundUser.userName != decoded.userName){
        return res.status(403).json({message:"incorrect user"})//
        }
        const roles = Object.values(foundUser.roles);
          const accessToken =jwt.sign(
            {
                EmployeeInfo:{userName: foundUser.userName,roles:roles,firstName:foundUser.firstName,lastName:foundUser.lastName}
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"10s"}
        );
        res.json({roles,accessToken})
    })
}

module.exports = { handleRefreshToken }