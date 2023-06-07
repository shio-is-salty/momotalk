import { useContext, useState } from "react"

// toast
import {toastSuccess, toastInfo, toastError} from "../components/Toast"

import axios from "axios"
import { UserContext } from "../context/UserContext"
import { Navigate } from "react-router-dom"
export const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  const {setUser} = useContext(UserContext)

  async function login(e){
    e.preventDefault()
    if(!username || !password){
      toastError('Please provide all the information!')
      return 
    }

    try{
      const {data} = await axios.post('/login', {username, password})
      setUser(data)
      setRedirect(true)
      toastSuccess("Welcome Back "+data.username+"!")

      

    }catch(e){
      if(e.response.status === 422){
        toastError(e.response.data)
      }

    }


  }

  if(redirect){
    return (
      <Navigate to="/chat" />
    )
  }
  return (
    <div className="mt-12 p-4 flex flex-col items-center justify-center">
      <h1 className="max-w-sm mx-auto text-dark-blue font-bold text-5xl text-center">
        Welcome to <span className="text-pink">MomoTalk</span>
      </h1>

      <form 
        onSubmit={login}
        className="mt-4 m-4 flex flex-col gap-2">
        <label className="text-black font-medium">
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block px-4 py-2 text-black border-2 border-dark-blue rounded-md"
            type="text"
            placeholder="Username" />
        </label>

        <label className="text-black font-medium">
          Password 
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block px-4 py-2 text-black border-2 border-dark-blue rounded-md"
            type="password"
            placeholder="Password" />
        </label>

        <button className="mt-1 py-2 bg-dark-blue rounded-md text-white font-bold text-xl">Login</button>
      </form>
    </div>
  )
}
