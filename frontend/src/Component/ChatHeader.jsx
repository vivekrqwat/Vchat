import React from 'react'
import { useChat } from '../store/Chatstore'
import { X } from 'lucide-react'

function ChatHeader() {
    const {selectUser,setSelecteuser}=useChat()
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={  selectUser.profilePic || "/image.png"} alt={selectUser.fullname} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{  selectUser.fullname}</h3>
            {/* <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p> */}
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelecteuser(null)}>
          <X />
        </button>
      </div>
    </div>
  )
}

export default ChatHeader
