import { Header } from "./Header"
import { Outlet } from "react-router-dom"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from "./Modal";
import { useState } from "react";

export const Layout = () => {
  const [modalToggle, setIsModalToggle] = useState(false)
  return (
    <div className="">
      <Header setIsModalToggle={setIsModalToggle}/>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
        />
      {modalToggle && <Modal setIsModalToggle={setIsModalToggle}/>}
      <Outlet />
    </div>
  )
}
