import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
require("dotenv")
const prisma = new PrismaClient()
const getAllShiftTypes = async (req:Request, res:Response)=>{
    const shiftTypes = await prisma.shiftType.findMany()
    if(!shiftTypes) return res.status(204).json({message:"No shift Types found"})
    res.json(shiftTypes)
}
const createShiftType = async (req:Request, res:Response)=>{
    if(!req?.body?.endTime || !req?.body?.startTime || !req?.body?.store)
    {
        res.status(400).json({message:"Starttime, endtime, and storeId are required!"})
    }
    try {
        const result = await prisma.shiftType.create({data:{startTime: req.body.startTime, endTime:req.body.endTime, storeId: req.body.store}})
        res.status(201).json({message:"shift was created"})
    }
    catch(error)
    {
        res.status(500).json({message:`Error:${error}`})
    }
}
const updateShiftType = async (req:Request, res:Response) => {
    if(!req?.body?.id ){
        res.status(400).json({message:"Id is required!"})
    }
    const shift = await prisma.shiftType.findFirst({where:{id:req.body.id}})
    if(!shift) return res.status(400).json({message: "Could not find shift"})
    if(req.body?.startTime) shift.startTime = req.body.startTime;
    if(req.body?.endTime) shift.endTime = req.body.endTime;
    const result = await prisma.shiftType.update({where:{id:shift.id},data:{startTime:shift.startTime,endTime:shift.endTime}})
    res.json(result)
}
const deleteShiftType = async (req:Request, res:Response)=>{
    if(!req?.params?.id){
        res.status(400).json({message:"Id is required!"})
    }
    const shift = await prisma.shiftType.findFirst({where:{id: req.params.id}})
    if(!shift) return res.status(400).json({message:"Could not find shift"})
    const result = await prisma.shiftType.delete({where:{id:shift.id}})
    res.json(result);
}
const getShiftType = async (req:Request, res:Response)=>{
    if(!req?.params?.id) return res.status(400).json({message:"Id is Required"})
    const shiftType = await prisma.shiftType.findFirst({where:{id:req.params.id}})
    if(!shiftType) return res.status(204).json({message:"No shift Types found"})
    res.json(shiftType)
}
module.exports = {
    getAllShiftTypes,
    createShiftType,
    updateShiftType,
    deleteShiftType,
    getShiftType
}