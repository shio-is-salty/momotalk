import yuzuIcon from "../assets/icons/yuzu.png"
import aliceIcon from "../assets/icons/alice.png"
import momoiIcon from "../assets/icons/momoi.png"
import midoriIcon from "../assets/icons/midori.png"

import { Link, Navigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
export const IndexPage = () => {
  const chrIconList = [yuzuIcon, aliceIcon, momoiIcon, midoriIcon]

  const {user, ready} = useContext(UserContext)
  if(user && ready){
    return (
      <Navigate to="/chat" />
    )
  }



  return (
    <div className="max-w-[800px] mx-auto p-4 mt-12 text-center">
      <div className="w-full ">
        <h1 className="text-5xl max-w-3xl font-bold text-dark-blue">Welcome to <span className="text-pink">MomoTalk</span></h1>
        <p className="mt-2 text-2xl mx-auto text-black max-w-md text-center">Hang out anytime, anywhere MomoTalk makes it easy and fun to stay close to your favorite people.</p>
      </div>

      <div className="w-full mt-8 flex gap-4 items-center justify-center">
        <Link to="/login" className="w-[100px] bg-dark-blue text-white font-bold px-4 py-2 rounded-md shadow-md">Login</Link>
        <Link to="/signup" className="w-[100px] bg-pink text-white font-bold px-4 py-2 rounded-md shadow-md">Signup</Link>
      </div>


      <div className="mt-8 flex flex-wrap justify-center items-center gap-2">
        {chrIconList.map((chr, i)=> (
          <img key={i} className="max-w-[150px] max-h-[150px] bg-cover bg-center rounded-lg" src={chr} alt="" />

        ))}
      </div>
    </div>
  )
  
}
