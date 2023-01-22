import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
require("dotenv")
const prisma = new PrismaClient()
const getAllRequestOffs = async (req:Request, res:Response)=>{
    const requestOffs = await prisma.requestOff.findMany();
    if(!requestOffs) return res.status(204).json({message:"No request off found!"})
    res.json(requestOffs)
}
const updateRequestOff = async (req:Request,res:Response) =>{
    if(!req?.body?.id || !req?.body?.status) return res.status(400).json({message:"Id and status are required!"})
    const requestOff = await prisma.requestOff.findUnique({where:{id:req.body.id}})
    if(!requestOff) return res.status(204).json({message:"No request off found"})
    const result = await prisma.requestOff.update({where:{id :requestOff.id}, data:{status:requestOff.status}})
    res.status(200).json(result)
}
const createRequestOff = async(req:Request,res:Response) => {
    if( !req?.body?.date||!req?.body?.employee) return res.status(400).json({message:"Date and employee are required!"})
    try {
        const result = await prisma.requestOff.create({data: {date:req.body.date, employeeId: req.body.employeeId}})
        res.status(200).json({message:`Request off ${result.id} created.`})
    } catch (error) {
        res.status(500).json({message:`Error: ${error}`})
    }
}
const deleteRequestOff = async (req:Request,res:Response) => {
    if(!req?.body?.id) return res.status(400).json({message:"Id is Required"})
    const rO = await prisma.requestOff.findUnique({where: {id: req.body.id}})
    if(!rO) return res.status(204).json({message: "No request off data was found!"})
    await prisma.requestOff.delete({where:{id:rO.id}})
    res.status(204)
}
const getRequest = async (req:Request, res:Response) => {
    if(!req?.params?.id) return res.status(400).json({message:"Id is Required"})
    const rO = await prisma.requestOff.findUnique({where:{id:req.params.id}})
    if(!rO) return res.status(204).json({message: "No request off data was found!"})
    res.status(200).json(rO)
}
module.exports ={
    getRequest,
    getAllRequestOffs,
    createRequestOff,
    updateRequestOff,
    deleteRequestOff
}