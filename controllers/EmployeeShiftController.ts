const bcrypt = require('bcrypt')
import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const getAllEmployeeShifts = async (req:Request,res:Response) =>{
    const shifts = await prisma.employeeShift.findMany()
    if(!shifts) return res.status(204).json({message:"No shifts found"})
    res.status(200).json(shifts)
}
const createEmployeeShift = async (req:Request,res:Response) =>{
    if(!req?.body?.day || !req?.body?.employee || !req?.body?.shiftType || !req?.body?.date) 
    return res.status(400).json({message: "Day, employee id, shift type id, and date are required"})
    try {
        const shift = await prisma.employeeShift.create({data:{dayOfWeek:req.body.day,employeeId:req.body.employee,date:req.body.date, shiftTypeId:req.body.shiftType}})
        res.status(204).json(shift)
    } catch (error) {
        res.status(500).json({message:`Error: ${error}`})
    }

}
const updateEmployeeShift = async (req:Request,res:Response) =>{
    if(!req?.body?.id) 
    return res.status(400).json({message: "Id is required"})
    const shift = await prisma.employeeShift.findUnique({where:{id:req.body.id}})
    if(!shift) return res.status(204).json({message: "No employee shift was found"})
    if(req?.body?.day) shift.dayOfWeek = req.body.day
    if(req?.body?.employee) shift.employeeId = req.body.employee
    if(req?.body?.shiftType) shift.shiftTypeId= req.body.shiftType
    if(req?.body?.date) shift.employeeId = req.body.date
    const result = await prisma.employeeShift.update({where:{id:req.body.id}, data:{dayOfWeek:shift.dayOfWeek,date:shift.date,employeeId:shift.employeeId,shiftTypeId:shift.shiftTypeId}})
    res.status(201).json(result)
}
const deleteEmployeeShift = async (req:Request,res:Response) =>{
    if(!req?.body?.id) 
    return res.status(400).json({message: "Id is required"})
    const shift = await prisma.employeeShift.findUnique({where:{id:req.body.id}})
    if(!shift) return res.status(404).json({message: "No employee shift was found"})
    await prisma.employeeShift.delete({where:{id:req.body.id}})
    res.status(204)

}
const getEmployeeShift = async (req:Request,res:Response) =>{
    if(!req?.params?.id) 
    return res.status(400).json({message: "Id is required"})
    const shift = await prisma.employeeShift.findUnique({where:{id:req.params.id}})
    if(!shift) return res.status(204).json({message: "No employee shift was found"})
    res.status(200).json(shift)
}
module.exports = {
    getAllEmployeeShifts,
    getEmployeeShift,
    deleteEmployeeShift,
    createEmployeeShift,
    updateEmployeeShift
}