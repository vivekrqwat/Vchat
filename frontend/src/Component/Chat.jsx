import React, { useEffect, useRef } from 'react'
import { useChat } from '../store/Chatstore'
import ChatHeader from './ChatHeader'
import MessageSkl from './Sekelton/MessageSkl'
import Input from './Input'
import { UseAuthcheck } from '../store/Authstore'
import { formatMessageTime } from '../lib/util'

function Chat() {
    const {message, isMessageLoading, selectUser, getMessage, substomsg, unsubtomsg} = useChat()
    const {authUser, socket} = UseAuthcheck()
    const messageEndRef = useRef(null);

    // Scroll to bottom when new messages arrive
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    useEffect(() => {
        if (selectUser?._id) {
            getMessage(selectUser._id);
            substomsg(socket);
            console.log(selectUser._id, "id from useEffect");
        }
        return () => unsubtomsg(socket);
    }, [selectUser?._id, getMessage, substomsg, unsubtomsg, socket]);

    if (isMessageLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessageSkl />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {message.map((message) => (
                    <div
                        key={message._id}
                        className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                    >
                        <div className="chat-image avatar">
                            <div className="size-10 rounded-full border">
                                <img
                                    src={
                                        message.senderId === authUser._id
                                            ? authUser.profilepic || "/image.png"
                                            : selectUser.profilepic || "/image.png"
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
                <div ref={messageEndRef} />
            </div>
            <Input />
        </div>
    );
}

export default Chat
