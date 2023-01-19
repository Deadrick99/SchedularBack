const jwt = require("jsonwebtoken")
import { NextFunction, Request,Response } from "express"
const verifyJWT = (req:Request,res:Response,next:NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader?.startsWith("Bearer ")){
        return res.sendStatus(401)
    }
    const token = authHeader.split(" ")[1]
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(error:any,decoded:any) => {
        if(error){
            console.log(error)
            console.log(token)
            return res.sendStatus(403)//invalid token
        }
        req.body.user = decoded.username;
        req.body.roles = decoded.EmployeeInfo.roles
        next()
    });
}
module.exports = verifyJWT;