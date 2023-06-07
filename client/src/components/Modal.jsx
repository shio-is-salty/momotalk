import { IoClose } from "react-icons/io5"
export const Modal = ({setIsModalToggle}) => {
    return (
        <div className="z-10 max-w-[500px] bg-red-600 right-0 absolute -mt-24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
            <div className="shadow rounded-md">
                <div className="px-2 flex justify-between items-center rounded-t-md text-3xl bg-pink text-white font-bold">
                    About
                    <IoClose className="cursor-pointer" onClick={() => setIsModalToggle(false)} />
                </div>
                <div className="p-2">
                    <p className="text-xl">This website is heavily inspired by Blue Archive (Momotalk) game feature.</p>
                    <a
                        className="text-blue underline"
                        href="https://bluearchive.nexon.com/home" target="_blank">find out more about the game by clicking this link.</a>

                    <div className="mt-8">
                        <h1>
                            Contact Me!<br />
                            Email: kylepagayon58@gmail.com <br />
                            Phone: (+63) 9760067919
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}