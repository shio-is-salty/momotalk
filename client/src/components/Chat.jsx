import { useContext, useEffect, useState } from "react"
import {academyList} from "./AcademyList"
import { RoomContext } from "../context/RoomContext"
import { MessageContext } from "../context/MessageContext"
import axios from "axios"
export const Chat = ({socket}) => {

    const {room, setRoom} = useContext(RoomContext)
    const {setMessages} = useContext(MessageContext)

    function joinRoom(room){
        socket.emit('join_room', room.name)
        setRoom(room)
    }

    async function getMessages(){
        const {data} =  await axios.post('/messages', {room:room.name})
        setMessages(data)
    }

    useEffect(() => {
        if(room){
            getMessages()
        }
    },[room])
    return (

        <div className="w-full bg-vanilla overflow-scroll">
            <div className="p-4 border-b-2">
                <h1 className="text-2xl text-gray-700 font-medium">Select an academy to join a chat.</h1>
            </div>
            <div className="">
                {academyList.map((academy, i) => {
                    return (
                        <div
                         key={i}
                         onClick={() => joinRoom({name: academy.name, icon:academy.icon})}
                         className="flex gap-2 items-center p-2 border-b cursor-pointer hover:bg-white">
                            <img className="w-12 h-12" src={academy.icon} />
                            <h1 className="text-lg font-bold text-gray-600">{academy.name}</h1>
                        </div>
                    )
                })}

            </div>

        </div>
    )
}