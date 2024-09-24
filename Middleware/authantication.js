const jwt = require("jsonwebtoken");
const userdb = require("../Model/usermodel");
const key = "cdmi"


const authenticate = async(req,res,next)=>{

    try {
        const token = req.headers.authorization;

        const verifytoken = jwt.verify(token,key);

        const rootUser = await userdb.findOne({_id:verifytoken.id});

        // console.log("rrr",rootUser)
        
        if(!rootUser) {throw new Error("user not found")}

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();

    } catch (error) {
        res.status(401).json({status:401,message:"Unauthorized no token provide"})
    }
}


module.exports = authenticate