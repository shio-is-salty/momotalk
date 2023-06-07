import { useState, useContext } from "react"
import { toast } from 'react-toastify';



// toast
import {toastInfo, toastError} from "../components/Toast"

import axios from "axios"
import { Navigate } from "react-router-dom";

export const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [redirect, setRedirect] = useState(false)



  async function signup(e){
    e.preventDefault()

    if(!username || !password || !rePassword){
      toastError('Please provide all the information.')
      return
    }

    if(password !== rePassword){
      toastError('Password doesnt match')
      return
    }

    if(password.length < 8 || rePassword.length < 8){
      toastError('Password to short')
      return
    }

    const {status} = await axios.post("/signup", {username, password})
    if (status === 200){
      toastInfo('Account Created!')
      setRedirect(true)
    }else{
      toastError("Something wen't wrong.")
    }

  }

  if(redirect){
    return(
      <Navigate to="/chat" />
    )
  }


  return (
    <div className="mt-12 p-4 flex flex-col items-center justify-center">
      <h1 className="max-w-sm mx-auto text-dark-blue font-bold text-5xl text-center">
        Welcome to <span className="text-pink">MomoTalk</span>
      </h1>

      <form onSubmit={signup} className="mt-4 m-4 flex flex-col gap-2">
        <label className="text-black font-medium">
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block px-4 py-2 text-black border-2 border-dark-blue rounded-md"
            type="text"
            placeholder="Username"
            required />
        </label>

        <label className="text-black font-medium">
          Password 
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block px-4 py-2 text-black border-2 border-dark-blue rounded-md"
            type="password"
            placeholder="Password"
            required />
        </label>

        <label className="text-black font-medium">
          Re-Password 
          <input
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            className="block px-4 py-2 text-black border-2 border-dark-blue rounded-md"
            type="password"
            placeholder="Re-Password"
            required />
        </label>

        <button className="mt-1 py-2 bg-dark-blue rounded-md text-white font-bold text-xl">Signup</button>
      </form>
    </div>
  )
}
