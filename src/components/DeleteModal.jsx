import { RiDeleteBin7Line } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import { createPortal } from "react-dom";



const DeleteModal = ({onclose,onDelete}) => {
    return createPortal(
        <div onClick={onclose} className="fixed inset-0 z-50 bg-transparent backdrop-blur-xs  border h-screen flex items-center justify-center ">
            <div className="flex flex-col  p-6   gap-4  rounded-xl shadow-xl bg-gray-100 transition" onClick={(e)=>e.stopPropagation()}>


                <div className=" flex justify-between px-2">
                    <div className=" p-2  shadow-md bg-white rounded-md">
                    <RiDeleteBin7Line className="inline w-6 h-6 text-red-500 " />
                    </div>
                    <div>
                        <button onClick={onclose} className=" rounded-full hover:bg-gray-200 transition ease-in">
                            <IoIosClose className="inline w-7 h-7" />
                          </button>  
                    </div>
                </div>
                <div className=" flex flex-col gap-1 pl-1 px-2">
                    <p className="font-bold text-lg">Delete Post</p>
                    <p className="text-gray-600 font-medium break-words">Are you sure you want to delete this post? This  <br />action cannot be undone.</p>
                </div>
                <div className="flex gap-5 justify-center mt-4 px-2 ">
                    <button onClick={onclose} className="p-2 font-semibold rounded-xl border border-gray-300 w-[50%] hover:bg-gray-200 trasition ease-in-out">
                        Cancel
                    </button>
                    <button onClick={onDelete} className="p-2 bg-red-600  text-white hover:bg-red-700 transition ease-in-out font-semibold rounded-xl  w-[50%]">Delete</button>
                </div>

            </div>
        </div>
    ,document.body
);
}

export default DeleteModal;