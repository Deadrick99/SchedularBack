import express, {  Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { verify } from "crypto";
const verifyJWT = require("./middleware/verifyJWT");
require("dotenv").config()
const corsOptions = require("./Config/corsOptions")
const credentials = require("./middleware/credentials")
const cookieParser = require("cookie-parser")
const app = express()
const prisma = new PrismaClient()
const cors = require("cors")

app.use(express.json())
app.use(credentials)
app.use(cors(corsOptions))
//middleware for cookies
app.use(cookieParser())

app.use("/register", require("./routes/register"))
app.use("/auth", require("./routes/auth"))
app.use("/refresh", require("./routes/refresh"))
app.use("/logout", require("./routes/logout"))
app.use(verifyJWT);
app.use("/release",require("./routes/api/releasedShifts"))
app.use("/shiftType",require("./routes/api/shiftTypes"))
app.use("/employees", require("./routes/api/employees"))
app.use("/requestOff", require("./routes/api/requestOff"))
app.use("/employeeAvail", require("./routes/api/employeeAvail"))
app.use("/employeeShift", require("./routes/api/employeeShift"))
app.use("/day", require("./routes/api/day"))
//get all employees
app.get('/', async(req:Request,res:Response)=>{
    const employees = await prisma.employee.findMany({
        include:{availability:true}
    })

    res.json({employees});
})
app.listen(3001);

