const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Console } from "console";

const prisma = new PrismaClient()

const handleLogin = async (req:Request, res:Response) =>{
    console.log(req.body)
    const userName = req.body.userName
    const password = req.body.password
    
    //if no username or pass ret 400 error these are required
    if(!userName || !password ){
        return res.sendStatus(400).json({message:"Username and password are required!"})
    }
    const foundUser = await prisma.employee.findFirst({where:{userName:req.body.userName}})
    if(!foundUser) return res.sendStatus(401);//could not find user 
    //see if password matches
    const match = await bcrypt.compare(password, foundUser.password)
    if(match ){
        const roles = Object.values(foundUser.roles).filter(Boolean)
        //create JWT's
        const accessToken =jwt.sign(
            {
                EmployeeInfo:{userName: foundUser.userName,roles:roles,firstName:foundUser.firstName,lastName:foundUser.lastName, id:foundUser.id}
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"30s"}
        )
        
        const refreshToken =jwt.sign(
            {
                userName: foundUser.userName
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:"1d"}
        )
        
        foundUser.refreshToken = refreshToken;
        await prisma.employee.update({
            where:{
                id:foundUser.id
            },
            data:{refreshToken:foundUser.refreshToken}
        })
       
        res.cookie("jwt",refreshToken,{
            httpOnly:true,
            sameSite: 'none',
            secure:true,
            maxAge:24*60*60*1000,
            
            
        })
        
        res.json({roles,accessToken,id:foundUser.id})
    }
    else{
        res.sendStatus(401).json({message:"Invalid Username or Password."})
    }
}
module.exports = {handleLogin}