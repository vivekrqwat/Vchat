import React from 'react'
import { useChat } from '../store/Chatstore';
import Chat from '../Component/Chat';
import NoChat from '../Component/NoChat';
import  Sidebar  from '../Component/Sidebar.jsx';

function Home() {
    const { selectUser}=useChat()
  return (
   <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar/>
           

            {! selectUser ? <NoChat /> : <Chat/>}
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Home
