import express from "express"
import http from "http"
import { Server } from "socket.io";
const app=express();
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173"],
    }
})

const userSocketMap={};
export function getRecvId(userid){
  return  userSocketMap[userid]
}
io.on('connection',(socket)=>{
    console.log("A user connected", socket.id);
    const userid=socket.handshake.query.userid;
    console.log(userid,"userid")
      if (userid) userSocketMap[userid] = socket.id;
        io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Handle new messages
    socket.on("newMessage", (message) => {
        const receiverSocketId = userSocketMap[message.receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", message);
        }
    });

    socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userid];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

})

export { io, app, server };