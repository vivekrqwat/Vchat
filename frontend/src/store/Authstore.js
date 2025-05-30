import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5001";
export const UseAuthcheck=create((set,get)=>({
    authUser:null,
    isSigning:false,
    isLogin:false,
    isUpdatinPic:false,
    isChecking:true,
    onlineUsers:[],
    socket:null,
     
    checkAuth:async()=>{
        try{
            const res=await axiosInstance.get('/auth/check');
            set({authUser:res.data})
                get().connectsocket();
        }catch(e){
            console.log("error is",e);
                 set({authUser:null})
        }finally{
            set({isChecking:false});
        }
    },

    signUp:async(data)=>{
        set({isSigning:true})
        console.log(data)
        try{
            const res= await axiosInstance.post("/auth/signup",data)
            toast.success("Account is created");
            set({authUser:res.data})
            get().connectsocket();
        }catch(e){
            toast.error("some error has occured",e)
        }finally{
            set({isSigning:false})
        }
    },    
    logout:async()=>{
        try{
            await axiosInstance.post("/auth/logout");
            toast.success("u Have been logout");
            set({authUser:null});
            get().disconnectSocket();
      
        }
        catch(e){
                 toast.error("some error has occured",e)
        }
    },
    login:async(data)=>{
        try{
            set({isLogin:true});
              const res=  await axiosInstance.post("/auth/login",data);
        
        set({authUser:res.data});
        toast.success('u have been login');
        console.log(get().authUser._id)
              get().connectsocket();

        }catch(e){
         toast.error("some error has occured",e);
        }finally{
            set({isLogin:false})
        }
    
    },
    updatePic:async(data)=>{
        console.log(data);
        set({isUpdatinPic:true});
        try{
            const res=await axiosInstance.put("/auth/update-image",data)
            set({authUser:res.data});
            toast.success("uploadsuccessfull")
        }catch(e){
             toast.error("some error has occured",e);
        }finally{
            set({isUpdatinPic:false});
        }

    },
    connectsocket:()=>{
     const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket=io(BASE_URL,{
        query:{
            userid:authUser._id
        }
    });
    socket.connect();
    set({ socket: socket });
      socket.on("getOnlineUsers", (userid) => {
        console.log(userid,"userid");
      set({ onlineUsers: userid });
    });

    },
      disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));