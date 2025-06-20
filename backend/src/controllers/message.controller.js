import cloudinary from "../lib/cloudnary.js";
import { getRecvId, io } from "../lib/socket.js";
import Message from "../models/message.model.js"
import User from "../models/user.model.js";
export const getUser=async(req,res)=>{
    try{
        const loggedinuser=req.user._id;
        const fillteruser= await User.find({_id:{$ne:loggedinuser}}).select("-password");
      
        res.status(200).json(fillteruser)
    }
    catch(e){
          res.status(500).json({message:"internal error"})

    }

}
export const getMessage=async(req,res)=>{
    try{
        const {id:usertochat}=req.params
        const myid=req.user._id;
        const Messages=await Message.find({
            $or:[{senderId:usertochat,receiverId:myid},
                {senderId:myid,receiverId:usertochat}
            ]
        })
        res.status(200).json(Messages)
    }
    catch(e){
        res.status(500).json({message:"internal error"});
    }
}
export const sendMessage=async(req,res)=>{
    try{
        // console.log(req.body)
        const{text,image}=req.body
        const{id:receiverId}=req.params
        const senderId=req.user.id;
        let imageUrl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        });
        
        const savedMessage = await newMessage.save();
        const recvsocketid = getRecvId(receiverId);
        
        if(recvsocketid){
            io.to(recvsocketid).emit('newmsg', savedMessage);
        }
        res.status(200).json(savedMessage);
    }
    catch(e){
           res.status(500).json({message:"internal error"});
    }
}