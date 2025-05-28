import { Image, Send, X } from "lucide-react";
import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import toast from "react-hot-toast";
import { useChat } from "../store/Chatstore";

function Input() {
    const[text,settext]=useState("")
    const[imgpreview,setimgpreview]=useState(null)
    const fileref=useRef()
    const{sendMessage}=useChat()
    const handleTmgchange=(e)=>{
        const file=e.target.files[0];
        if(!file.type.startsWith("image/")){
              toast.error("Please select an image file");
                return;
        }
         const reader = new FileReader();
    reader.onloadend = () => {
      setimgpreview(reader.result);
    };
    reader.readAsDataURL(file);
    }

    const removeImage=()=>{
        setimgpreview(null);
    if (fileref.current) fileref.current.value = "";
    }
     const handleSendmessgae = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imgpreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imgpreview,
      });

      // Clear form
      settext("");
      setimgpreview(null);
      if (fileref.current) fileref.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };
  return (
   <div className="p-4 w-full">
      {imgpreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imgpreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendmessgae} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => settext(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileref}
            onChange={handleTmgchange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imgpreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileref.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imgpreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  )
}

export default Input
