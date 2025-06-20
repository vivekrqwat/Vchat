import {create} from 'zustand'
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'

export const useChat = create((set, get) => ({
    message: [],
    user: [],
    selectUser: null,
    isUserloading: false,
    isMessageLoading: false,

    getUser: async () => {
        set({isUserloading: true})
        try {
            const res = await axiosInstance.get('/message/users');
            set({user: res.data});
        } catch(error) {
            toast.error("Something went wrong")
        } finally { 
            set({isUserloading: false})
        }
    },

    getMessage: async (id) => {
        if (!id) return;
        set({isMessageLoading: true})
        try {
            const res = await axiosInstance.get(`/message/${id}`);
            if (Array.isArray(res.data)) {
                set({message: res.data});
            }
        } catch(error) {
            toast.error("Something went wrong while getting messages")
        } finally { 
            set({isMessageLoading: false})
        }
    },

    sendMessage: async (messageData) => {
        const {selectUser, message} = get();
        if (!selectUser?._id) return;
        
        try {
            const res = await axiosInstance.post(`/message/send/${selectUser._id}`, messageData);
            if (res.data) {
                // Update local message state with the new message
                set({message: [...message, res.data]});
            }
        } catch(error) {
            toast.error("Something went wrong while sending message")
        }
    },

    substomsg: (socket) => {
        if (!socket) return;
        
        // Remove any existing listeners to prevent duplicates
        socket.off('newmsg');
        
        socket.on('newmsg', (newMessage) => {
            const currentMessages = get().message;
            const selectUser = get().selectUser;
            
            // Only update if it's relevant to current chat
            if (selectUser && 
                (newMessage.senderId === selectUser._id || 
                 newMessage.receiverId === selectUser._id)) {
                set({message: [...currentMessages, newMessage]});
            }
        });
    },

    unsubtomsg: (socket) => {
        if (!socket) return;
        socket.off('newmsg');
    },

    setSelectuser: (selectUser) => {
        set({selectUser});
        if (selectUser?._id) {
            get().getMessage(selectUser._id);
        }
    }
}))