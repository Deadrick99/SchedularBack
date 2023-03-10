import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
require("dotenv")
const prisma = new PrismaClient()
 const availibilty= new Map([
    ["OPEN",-1],
    ["9AM",0],
    ["10AM",1],
    ["11AM",2],
    ["12PM",3],
    ["1PM",4],
    ["2PM",5],
    ["3PM",6],
    ["4PM",7],
    ["5PM",8],
    ["6PM",9],
    ["7PM",10],
    ["8PM",11],
    ["CLOSE",12],
    ]);
//check and see if any conflicting times for the day


const getAllDays = async(req:Request,res:Response) =>{
    const days = await prisma.day.findMany();
    if(!days) return res.status(204).json({message:"No days found"}) 
    res.status(200).json(days)
}

const createDay = async(req:Request,res:Response) =>{
    if(!req?.body?.day||!req?.body?.startTime || !req?.body?.endTime || !req?.body?.numEmployees || !req?.body?.storeId) 
    return res.status(400).json({message:"Day of week, start time, end Time, and number of employees is required!"})
    
    try {
        const result = await prisma.day.create({data: {dayOfWeek:req.body.day,startTime:req.body.startTime,endTime:req.body.endTime,numEmployees:req.body.numEmployees, storeId:req.body.storeId}})
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({message:`Error:${error}`})
    }
    
}
const updateDay = async(req:Request,res:Response) =>{
    if(!req?.body?.id) return res.status(400).json({message:"Id is required"})
    const day = await prisma.day.findUnique({where:{id:req.body.id}})
    if(!day) return res.status(204).json({message:"No day found"})
    if(req.body.day) day.dayOfWeek = req.body.day
    if(req.body.startTime) day.startTime = req.body.startTime
    if(req.body.endTime) day.endTime = req.body.endTime
    if(req.body.numEmployees) day.numEmployees = req.body.numEmployees
    const result = await prisma.day.update({where:{id:day.id}, data:{dayOfWeek:day.dayOfWeek,startTime:day.startTime,endTime:day.endTime,numEmployees:day.numEmployees}})
    res.status(201).json(result)
}
const deleteDay = async (req:Request,res:Response) =>{
    if(!req?.params?.id) return res.status(400).json({message:"Id is required"})
    const day = await prisma.day.findUnique({where:{id:req.params.id}})
    if(!day) return res.sendStatus(204).json({message:"No day found"})
    await prisma.day.delete({where:{id:day.id}})
    res.sendStatus(200)
}
const getDay = async (req:Request,res:Response) =>{
    if(!req?.params?.id) return res.status(400).json({message:"Id is required"})
    const day = await prisma.day.findUnique({where:{id:req.params.id}})
    if(!day) return res.status(204).json({message:"No day found"})
    res.status(200).json(day)
}
module.exports ={
    getAllDays,getDay,updateDay,createDay,deleteDay
}