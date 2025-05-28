import {create} from'zustand'
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'
export const useChat=create((set,get)=>({
    message:[],
    user:[],
    selectUser:null,
    isUserloading:false,
    isMessageLoading:false,

    getUser:async()=>{
        set({isUserloading:true})
        try{
            const res=await axiosInstance.get('/message/users');
            console.log(res.data,"user");
            set({user:res.data});
            

        }catch(e){
            toast.error("something went worng")
        }finally{ set({isUserloading:false})}
    },

    getMessage:async(id)=>{
         set({isMessageLoading:true})
         console.log(id,"id pf ")
         try{
            const res=await axiosInstance.get(`/message/${id}`);
             set({message:res.data});
         }
         catch(e){
             toast.error("something went worng while getting message")
         }finally{ set({isMessageLoading:false})}
    },

    sendMessage:async(messagedata)=>{
        const{selectUser,message}=get();
        try{
            const res=await axiosInstance.post(`/message/send/${selectUser._id}`,messagedata);
            set({message:[...message,res.data]});
        }catch(e){
          toast.error("something went worng while sending message")

        }

    },
    setSelectuser:(selectUser)=>{set({selectUser})}

}))