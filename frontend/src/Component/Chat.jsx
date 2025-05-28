import React from 'react'
import { useChat } from '../store/Chatstore'
import { useEffect } from 'react'
import ChatHeader from './ChatHeader'
import MessageSkl from './Sekelton/MessageSkl'
import Input from './Input'
import { UseAuthcheck } from '../store/Authstore'
import { formatMessageTime } from '../lib/util'
import { useRef } from 'react'

function Chat() {
    const {message,user,isMessageLoading,selectUser,getMessage}=useChat()
    const{authUser}=UseAuthcheck()
     const messageEndRef = useRef(null);
    useEffect(()=>{
        getMessage(selectUser._id)
    },[selectUser._id,getMessage])

    if(isMessageLoading){
        return(
             <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader>
                </ChatHeader>
                <MessageSkl></MessageSkl>
             </div>
        )
    }
  return (
   <div className="flex-1 flex flex-col overflow-auto">
     
      <ChatHeader></ChatHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {message.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilepic || "/avatar.png"
                      : selectUser.profilepic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>



      <Input></Input>
    </div>
  )
}

export default Chat
