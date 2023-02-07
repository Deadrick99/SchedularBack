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
app.use("/userName", require("./routes/api/userName"))
app.use("/register", require("./routes/register"))
app.use("/store", require("./routes/api/store"))
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

const PORT = process.env.PORT || 3001
app.listen(PORT);

