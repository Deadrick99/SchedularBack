import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
require("dotenv")
const prisma = new PrismaClient()

const getAllStores = async (req:Request, res:Response) =>{
    const stores = await prisma.store.findMany()
    if(!stores) return res.status(204).json({message:"No shift Types found"})
    res.json(stores)
}
module.exports ={
    getAllStores
}