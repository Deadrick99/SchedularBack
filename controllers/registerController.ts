const bcrypt = require('bcrypt')
import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const handleNewUser = async (req:Request, res:Response) =>{
    console.log(req.body)
    const userName = req.body.userName
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const storeId = req.body.storeId
    const numHours = req.body.numHours
    //if no username or pass ret 400 error these are required
    if(!userName || !password || !firstName || !lastName ||!storeId || !numHours){
        return res.status(400).json({message:"Username, password, firstname, lastname, Desired Hours and store id are required!"})
    }
    
    //check for duplicates if found ret 409 username already exists
    const duplicate = await prisma.employee.findFirst({
        where:{
            userName:userName
        }
    })
    if(duplicate) {
        return res.status(409).json({message : "User name already exists please choose a different one."})
    }
    //if no duplicat was found create user
    try {
        const hashPass = await bcrypt.hash(password,10)
        await prisma.employee.create({
           data:{
            userName: userName,
            password:hashPass,
            firstName:firstName,
            lastName:lastName,
            storeId:storeId,
            numHours:numHours,
            refreshToken:""
           }
        })
        res.status(201).json({message:`New user ${userName} was created!`})
    } catch (error:any) {
        res.status(500).json({message: error.message})
    }

}

module.exports = {handleNewUser}