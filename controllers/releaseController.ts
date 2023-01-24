import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
require("dotenv")
const prisma = new PrismaClient()

const getAllAvailRelease = async (req:Request, res:Response)=>{
    if(!req?.body?.roles){
        res.status(400).json({message:"Roles are required"})
    }
       
    const releasedShifts = await prisma.releasedShift.findMany({where:{roles:req.body.roles}})
    if(!releasedShifts){
        res.status(204).json({message:"No shift is availible for this role!"})
    }
    res.json(releasedShifts)
}
const createRelease = async (req:Request,res:Response) => {
    if (!req?.body?.roles || !req?.body?.employeeShiftId)
    {
        res.status(400).json({message:"Roles and EmployeeShiftID are required!"})
    }
    try {
        const shift =await prisma.releasedShift.create({data:{
        roles:req.body.roles,
        employeeShiftId:req.body.employeeShiftId
       
    }})
     res.status(201).json({message:`Released shift ${shift.id} was created`})
    } catch (error) {
        res.status(500).json({message:`Error:${error}`})
    }
}
const updateRelease = async (req:Request,res:Response) => {
    if (!req?.body?.id ||!req?.body?.status)
    {
        res.status(400).json({message:"Id and status are required!"})
    }
    
    const shift =await prisma.releasedShift.findFirst({where:{
    id:req.body.id,
       }})
       if(!shift){
        res.status(400).json({message:`Shift was not found!`})
    }
    else{
        await prisma.releasedShift.update({where:{
            id:req.body.id
        },
       data:{
        status:req.body.status
       }})
     res.status(200).json({message:`Released shift ${shift.id} was updated`})
    }
   
    
}
const deleteRelease = async (req:Request,res:Response) => {
    if (!req?.body?.id)
    {
        res.status(400).json({message:"Id is required!"})
    }
     const shift =await prisma.releasedShift.findFirst({where:{
    id:req.body.id,
       }})
       if(!shift){
        res.status(400).json({message:`Shift was not found!`})
    }
    else{
        await prisma.releasedShift.delete({where:{
            id:req.body.id
        }})
     res.status(200).json({message:`Released shift ${shift.id} was updated`})
    }
}
const getAvailRelease = async (req:Request, res:Response)=>{
    if(!req?.body?.roles || !req?.params?.id){
        res.status(400).json({message:"Roles and ID are required"})
    }
    
    const releasedShift = prisma.releasedShift.findFirst({where:{roles:req.body.roles, id:req.params.id}})
    if(!releasedShift){
        res.status(204).json({message:"No shift is availible for this role!"})
    }
    res.json({releasedShift})
}
module.exports = {
    getAllAvailRelease,
    getAvailRelease,
    deleteRelease,
    createRelease,
    updateRelease
}