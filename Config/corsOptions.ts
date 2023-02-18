const origins = require("./allowedOrgins")
const corsOptions ={
    
    origin: (origin:any,callback:any) => {
        if(origins.indexOf(origin) !== -1 || !origin){
            callback(null,true);
        }
        else{
            callback(new Error("Not allowed by Cors"))
        }
    },
    credentials: true,

    optionsSuccessStatus:200
}
module.exports = corsOptions
