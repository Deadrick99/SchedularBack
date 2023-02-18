import { Response,Request, NextFunction } from "express"
const allowedOrigins = require("../Config/allowedOrgins")

const credentials = (req:Request, res:Response, next:NextFunction) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {

    res.header("Access-Control-Allow-Credentials", "true");
   res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173")
  }
  next();
};
module.exports = credentials;