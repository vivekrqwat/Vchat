import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
export const routecheck=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt
        
        if(!token)return res.status(404).json({message:"token expire"});
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
    
        if(!decoded)return res.status(403).json({message:"unAutherize"});
        const user=await User.findById(decoded.userid).select('-password')
        if(!user)return res.status(402).json({message:"User not found"});
        req.user=user;
      
        next();

    }catch(e){
        console.log("routecheck")
         res.status(404).json({message:"internal error"});
    }
}