import {toast} from "react-toastify"
// toast icons
import aronaSuccessIcon from '../assets/icons/arona_success.png'
import aronaInfoIcon from "../assets/icons/arona_info.png"
import aronaErrorIcon from "../assets/icons/arona_error.png"
export function toastSuccess(text){
      toast.info(
        <div className="flex gap-2 items-center">
          <img className="w-20 h-20" src={aronaSuccessIcon} />
          <h1 className="font-bold">{text}</h1>
        </div>, {
        position: "top-right",
        icon: false,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
  }

export function toastInfo(text){
      toast.info(
        <div className="flex gap-2 items-center">
          <img className="w-20 h-20" src={aronaInfoIcon} />
          <h1 className="font-bold">{text}</h1>
        </div>, {
        position: "top-right",
        icon: false,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
  }

export function toastError(text){
      toast.error(
        <div className="flex gap-2 items-center">
          <img className="w-20 h-20" src={aronaErrorIcon} />
          <h1 className="font-bold">{text}</h1>
        </div>, {
        position: "top-right",
        icon: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
  }