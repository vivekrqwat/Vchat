import mongoose from "mongoose";
export  const connectDb=async()=>{
    try{
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("mongo connect")
    }catch(e){
        console.log("error is",e);
    }
}

