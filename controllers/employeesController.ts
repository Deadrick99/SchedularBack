import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
require("dotenv")
const prisma = new PrismaClient()

const getAllEmployees = async (req:Request, res:Response) =>{
    const employees = await prisma.employee.findMany();
    if (!employees) return res.status(204).json({message:"No users Found"});
    res.json(employees) 
}

const deleteEmployee =  async (req:Request, res:Response) =>{
    if(!req?.body?.id) {
        return res.status(400).json({message:"Id is required"});
    }
    const employee = await prisma.employee.findUnique({where:{id:req.body.id}})
    if(!employee){
        return res.status(400).json({message:`Could not find employee with ID: ${req.body.id}`})
    }
    const result = await prisma.employee.delete({where:{id:req.body.id}})
    res.json(result)
}
const updateEmployee = async (req:Request,res:Response) => {
    if(!req?.body?.id) {
        return res.status(400).json({message:"Id is required"});
    }
    const employee = await prisma.employee.findUnique({where:{id:req.body.id}})
    if(!employee){
        return res.status(400).json({message:`Could not find employee with ID: ${req.body.id}`})
    }
    if(req?.body?.availSet) employee.availSet = req.body.availSet;
    const result = await prisma.employee.update({where:{id:req.body.id}, data:{availSet:employee.availSet}})
    res.status(201).json(result)
}
const getEmployee = async (req:Request, res:Response) =>{
    if(!req?.params?.id) {
        return res.status(400).json({message:"id is required"});
    }
    const employee = await prisma.employee.findUnique({where:{id:req.params.id}});
    if(!employee){
        return res.status(400).json({message:`Could not find employee with id: ${req.params.id}`})
    }
    res.json(employee) 
}
module.exports ={getAllEmployees,deleteEmployee,getEmployee, updateEmployee}