import {useContext, useState, useEffect} from "react"
import {UserContext} from "../context/UserContext"
import { Navigate } from "react-router-dom"

// icons
import {FaUserAlt} from "react-icons/fa"
import {BsFillChatLeftDotsFill} from "react-icons/bs"
import { Profile } from "../components/Profile"
import { Chat } from "../components/Chat"

import { BiLogOut } from "react-icons/bi"
import { Messages } from "../components/Messages"

// axios
import axios from "axios"

// socket
import io from 'socket.io-client'
const socket = io.connect('http://192.168.2.225:4001')

export const ChatPage = () => {

    const [redirect, setRedirect] = useState(false)
    const [isProfile, setIsProfile] = useState(false)
    const {user, ready} = useContext(UserContext)



    async function logout(){
        const {data} = await axios.post('/logout')
        if(data){
            location.reload()
        }

    }


    if(!ready){
        return (
            <div>Loading...</div>
        )
    }

    if(ready && !user && !redirect){
        return (
            <Navigate to="/login" />
        )
    }



    return (
        <div className="flex h-screen">

            <div className="flex flex-col items-center h-full bg-dark-blue">
                <div 
                    onClick={() => setIsProfile(true)}
                    className={`flex ${isProfile ? 'bg-vanilla-20': ''} justify-center items-center w-full h-20 p-6`}>
                    <FaUserAlt className={`w-8 h-8 ${isProfile ? 'text-white': 'text-[#7A818E]'}`}/>
                </div>

                <div
                    onClick={() => setIsProfile(false)}
                    className={`flex ${!isProfile ? 'bg-vanilla-20': ''} justify-center items-center w-full h-20`}>
                    <BsFillChatLeftDotsFill
                        className={`w-8 h-8 ${!isProfile ? 'text-white': 'text-[#7A818E]'}`} />
                </div>

                <div className="flex justify-center items-center self-end mt-auto w-full h-20">
                    <BiLogOut 
                        onClick={logout}
                        className='cursor-pointer w-8 h-8 text-[#7A818E] '/>
                </div>
            </div>

            <div className="flex grow">
                {isProfile && <Profile />}
                {!isProfile && <Chat socket={socket} />}
                <Messages socket={socket} />

            </div>
        </div>

    )
}