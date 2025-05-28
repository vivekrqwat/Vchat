// import { use } from "react"
import cloudinary from "../lib/cloudnary.js"
import { generateToken } from "../lib/util.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup=async(req,res)=>{
    const {fullname,email,password }=req.body
   try{
    //hash password
    if(!fullname||!email||!password) return res.status(400).json({message:"fill all enteries"})

    if(password.length<6){
        return res.status(400).json({message:"password must be 6 char"})
    }
    const user=await User.findOne({email});
    //to check if user exist or not
    if(user)return res.status(400).json({message:"already exist"});
    const salt= await bcrypt.genSalt(10);
    const handlePassword=await bcrypt.hash(password,salt);

    const newUser=new User({
        fullname:fullname,
        email:email,
        password:handlePassword

    })
    if(newUser){
        generateToken(newUser._id,res)
        await newUser.save();
        res.status(201).json({
            _id:newUser._id
        })
    }
        else{
    return res.status(400).json({message:"invalid data"});}

   }catch(e){
    console.log("erorr in signup",e)
   }
}
export const login=async (req,res)=>{
    try{
        console.log(res.body,"login")
    const {email,password}=req.body;
    const user =await User.findOne({email});
    if(!user)return res.status(404).json({message:"not found"});
    const checkpassword=await bcrypt.compare(password,user.password);
    if(!checkpassword)return res.status(404).json({message:"invalid passowrd"});
    generateToken(user._id,res);
    res.status(200).json({
        fullname:user.fullname,
        email:user.email,
        profilepic:user.profilepic

    })

    }catch(e){
        console.log("error is ",e)
         res.status(500).json({message:"interna error"});
    }
   
}
export const logout=async(req,res)=>{
    try{
        res.cookie("jwt","",0);
        res.status(200).json({message:"ho gya"})
    }
    catch(e){
        console.log('some_error')
         res.status(500).json({message:"interna error"});
    
}
}
export const update=async(req,res)=>{
   console.log('pic')
    try{
        const {profilepic}=req.body
        const userId=req.user._id;
        if(!profilepic) return res.status(404).json({message:"no pic"})
         const uploadpic= await cloudinary.uploader.upload(profilepic);
        const updateuser=await User.findByIdAndUpdate(userId,{profilepic:uploadpic.secure_url},{new:true})       
        res.status(200).json({message:"done uploading"});
    }   
    catch(e){
        res.status(406).json({message:"something went wrong"})
    }

}
export const checkAuth=async(req,res)=>{
    try{
        res.status(200).json(req.user)
    }
    catch(e){
        res.status(500).json({message:"internal error"})
    }
}
