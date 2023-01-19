import { Response,Request, NextFunction } from "express"
const verifyRoles = (...allowedRoles:any) => {
    return (req:Request,res:Response,next:NextFunction) => {
        console.log(req?.body?.roles)
        if(!req?.body?.roles) return res.sendStatus(401)
    
    const rolesArray=[...allowedRoles];
    console.log(`roles aray:${rolesArray}`)
    const result = req.body.roles.map((role: any)=> rolesArray.includes(role)).find((val: boolean)=> val === true)
    if(!result) return res.sendStatus(401);
    next()
    }

}
module.exports = verifyRoles