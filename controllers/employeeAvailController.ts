import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
require("dotenv")
const prisma = new PrismaClient()

const getAllEmployeeAvail = async (req:Request,res:Response) =>{
    const all = await prisma.employeeAvailability.findMany();
    if(!all) return res.status(204).json({message:"Could not find any employees."})
    res.status(200).json(all)
}
const updateEmployeeAvail = async (req:Request,res:Response) =>{
    if (!req?.body?.id) return res.status(400).json({message:'Id is required!'})
    const avail = await prisma.employeeAvailability.findUnique({where:{id: req.body.id}})
    if(!avail) return res.status(204).json({message:"Could not find requested Availibilty"})
    if(req?.body?.day) avail.day = req.body.day;
    if(req?.body?.startTime) avail.startTime = req.body.startTime;
    if(req?.body?.endTime) avail.endTime = req.body.endTime;
    const result = await prisma.employeeAvailability.update({where:{id:avail.id},data:{day:avail.day,startTime:avail.startTime,endTime:avail.endTime}})
    res.status(201).json(result)
}
const deleteEmployeeAvail = async (req:Request,res:Response) =>{
    if (!req?.body?.id) return res.status(400).json({message:'Id is required!'})
    const avail = await prisma.employeeAvailability.findUnique({where:{id: req.body.id}})
    if(!avail) return res.status(204).json({message:"Could not find requested Availibilty"})
    await prisma.employeeAvailability.delete({where:{id:avail.id}})
    res.status(204)
}
const createEmployeeAvail = async (req:Request,res:Response) =>{
    if(!req?.body?.day ||!req?.body?.endTime||!req?.body?.startTime||!req?.body?.employee) 
    return res.status(400).json({message:"Day, start time, end time, and employee id are all required!"})
    const duplicate = await prisma.employeeAvailability.findMany({where: {employeeId:req.body.employee }})
    duplicate.forEach(dup => {
        if (dup.day === req.body.day)
    {
        return res.status(400).json({message: "day already exists"})
    }
    });
    
    try {
        const avail = await prisma.employeeAvailability.create({data:{day: req.body.day, startTime:req.body.startTime,endTime: req.body.endTime, employeeId:req.body.employee}})
        res.status(201).json(avail)
    } catch (error) {
        res.status(500).json({message:`Error: ${error}`})
    }
}
const getEmployeeAvail = async (req:Request,res:Response) =>{
    if (!req?.params?.id) return res.status(400).json({message:'Id is required!'})
    const avail = await prisma.employeeAvailability.findMany({where:{employeeId: req.params.id}})
    if(!avail) return res.status(204).json({message:"Could not find requested Availibilty"})
    res.status(200).json(avail);
}
module.exports = {
    getAllEmployeeAvail,
    getEmployeeAvail,
    deleteEmployeeAvail,
    createEmployeeAvail,
    updateEmployeeAvail
}