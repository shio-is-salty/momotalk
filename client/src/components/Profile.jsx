import axios from "axios"
import yuzuIcon from "../assets/icons/profile/yuzu.png"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

import {iconList} from "./IconList"
import {toastSuccess, toastInfo, toastError} from "../components/Toast"
export const Profile = () => {


    const {user} = useContext(UserContext)
    const iconURL = axios.defaults.baseURL+"/assets/profile/"

    if(!user){
        return (
            <div>Loading...</div>
        )
    }

    async function changeIcon(icon){
        await axios.post('/update-profile', {id:user.id, icon})
        toastSuccess('Profile Updated')
        setTimeout(() => {
            location.reload()
            
        }, 3000);
        

    }

    return (
        <div className="w-full bg-vanilla p-4 overflow-scroll">
            <h1 className="text-3xl">Profile</h1>

            <div className="w-full flex justify-between items-center">
                <h1 className="text-2xl">Username: {user.username}</h1>
                <img className="w-16 h-16 bg-cover bg-center" src={iconURL+user.icon} alt="" />
            </div>

            <div className="mt-4 w-full ">
                <h1 className="text-2xl">Change Icon</h1>
                <div className="mt-4 flex justify-center flex-wrap gap-4">
                    {iconList.map(icon => (
                        <div key={icon} onClick={() => changeIcon(icon)} className="cursor-pointer">
                            <img  className="w-16 h-16" src={iconURL+icon} alt="" />
                            <h1 className="font-medium text-black text-center">{icon.split(".png")[0]}</h1>
                        </div>
                    ))}

                </div>

            </div>

        </div>
    )
}