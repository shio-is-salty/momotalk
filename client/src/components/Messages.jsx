import { useContext, useEffect, useRef, useState } from "react"
import { RiSendPlane2Fill } from "react-icons/ri"
import { RoomContext } from "../context/RoomContext"
import { MessageContext } from "../context/MessageContext"

import noSelectedAcademy from "../assets/icons/no_selected_academy.jpg"
import yuzuIcon from "../assets/icons/profile/yuzu.png"
import { UserContext } from "../context/UserContext"

import ScrollToBottom, {useScrollToBottom} from 'react-scroll-to-bottom'
import {iconList, iconURL} from "./IconList"

import axios from "axios"

export const Messages = ({socket}) => {

    const [message, setMessage] = useState("")

    // context
    const {user} = useContext(UserContext)
    const {room} = useContext(RoomContext)
    const {messages, setMessages} = useContext(MessageContext)

    async function sendMessage(e){
        e.preventDefault()
        const send_message =  {
            text: message,
            sender: user.id,
            room: room.name,
        }

        try{
            await axios.post('send_message', send_message)
            socket.emit('send_message', send_message)
        }catch(e){
            alert(e)
        }
        setMessage("")
        getMessages(room.name)
        useScrollToBottom()
        

    }

    async function getMessages(room){
        const {data} = await axios.post('/messages', {room})
        setMessages(data) 
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            getMessages(data.room)
        })

    }, [socket])

    return (
        <div className="w-full">
        {!room && (
         <div className="-mt-12 w-full h-full flex flex-col justify-center items-center">
             <img className="w-6/12 bg-center bg-cover rounded-full" src={noSelectedAcademy} alt="" />
             <h1 className="text-2xl font-bold text-dark-blue mt-4">No Academy Selected!</h1>
         </div>
        )}

        {room && (
        <div className="w-full h-full flex flex-col">
            <div className="flex justify-between items-center border-b-2 py-2 px-4">
                <h1 className="text-2xl font-bold text-dark-blue">{room.name}</h1>
                <img className="w-12 h-12" src={room.icon} alt="" />
            </div>

            <ScrollToBottom  className="grow justify-between flex flex-col p-2 overflow-scroll">
                <div className=" grow">
                    {messages.length > 0 && messages.map((m, i)=> {
                        return (
                            <div key={i} className="">
                                <div className="flex gap-1 p-2">
                                    {m.sender._id !== user.id && (
                                        <img className="w-12 h-12 rounded-full" src={axios.defaults.baseURL+'/assets/profile/'+m.sender.icon} alt="" />
                                    )}
                                    <div className="w-full -mt-1">
                                        {m.sender._id !== user.id && (
                                            <h1 className="font-medium text-black">{m.sender.username}</h1>
                                        )}
                                        <div className="flex w-full ">
                                        <p className={`px-2 py-1 rounded-md ${m.sender._id !== user.id ? 'bg-dark-blue' : 'bg-blue text-right ml-auto' } text-white font-medium`}>
                                           {m.text}
                                        </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </ScrollToBottom>
                <form onSubmit={sendMessage} className="p-4 flex gap-1 justify-between items-center">
                    <input 
                       value={message}
                       onChange={(e) => setMessage(e.target.value)}
                       className="w-full py-2 px-4 text-lg border-2 border-dark-blue outline-none rounded-full"
                       type="text" placeholder="Message..."/>
                   <button>
                        <RiSendPlane2Fill className="w-12 h-12 text-dark-blue"/>
                   </button>
                </form>
        </div>
        )}

        </div>

    )
}