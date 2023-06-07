
import momotalkLogo from "../assets/icons/momotalk.svg"
import { Link } from "react-router-dom"
export const Header = ({setIsModalToggle}) => {
  return (
    <header className="w-full bg-pink px-4 py-2">
      <div className="flex gap-4 items-center">
        <Link to="/" className="flex gap-2 items-center justify-center">
          <img className="w-8 h-8" src={momotalkLogo} alt="" />
          <h1 to="/" className="text-white font-extrabold text-3xl">MomoTalk</h1>
        </Link>

        <span 
          onClick={() => setIsModalToggle(prev => !prev)}
          className="cursor-pointer px-2  text-pink bg-white font-bold text-2xl rounded-md shadow-md">?</span>
      </div>

      
    </header>
  )
}
