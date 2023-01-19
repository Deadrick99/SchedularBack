import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
require("dotenv")
const prisma = new PrismaClient()

const handleLogout = async (req:Request, res:Response) => {
    const cookies = req.cookies
    console.log(cookies)
    if(!cookies?.jwt){ 
        return res.sendStatus(204);
    }
    const refreshToken = cookies.jwt;

    const foundEmployee = await prisma.employee.findFirst(refreshToken)
    if(!foundEmployee){
        res.clearCookie("jwt", {httpOnly:true, sameSite:"none"
        //, secure:true
    })
        return res.sendStatus(403)
    }
    foundEmployee.refreshToken = "";
    prisma.employee.update({where:{id:foundEmployee.id},data:{refreshToken:foundEmployee.refreshToken}})
    res.clearCookie("jwt", {httpOnly:true,sameSite:"none"
        //,secure:true
        })
    return res.status(204).json({message:"Logout successful!"})
}
module.exports= {handleLogout}