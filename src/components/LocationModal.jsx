import React, { useState } from "react";
import { GrClose } from "react-icons/gr";

const LocationModal = ({ onClose,setLocation }) => {
    const [PostText ,setPostText] = useState("");
    const [loading,setLoading] = useState(false);

    const handleChange = (e)=>{
        setPostText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setLocation(PostText);
        setLoading(false);
        onClose();
    }

    //  const val = PostText?PostText.length === null:PostText.length!== null;
    //  console.log(val);  
    return (
        <div className="fixed inset-0 border border-1 z-50 flex items-center justify-center bg-transparent backdrop-blur-xs">
            <div className="relative w-11/12 max-w-md p-6 rounded-2xl h-[47vh] shadow-2xl flex flex-col justify-center bg-sky-100/95 border border-white/60">
                <div 
                    onClick={onClose}
                    className="absolute right-3 top-3 bg-indigo-700 p-2.5 rounded-full hover:bg-indigo-500 transition cursor-pointer shadow-md"
                >
                    <GrClose className="w-5 h-5 text-white" />
                </div>
                <div className="p-1 mb-2">
                    <p className="font-semibold text-lg text-gray-800 border-b border-gray-300 pb-2">Enter location</p>
                </div>

                {/* input box */}
                <div className="p-1">
                    <form onSubmit={handleSubmit}>
                        <input 
                            name="PostText"
                            value={PostText}
                            onChange={handleChange}
                            required
                            type="text"
                            className="text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 p-3 font-semibold border border-gray-300 w-full rounded-lg bg-white"
                            placeholder="write your place...."
                        />
                        <button 
                       
                            disabled={!PostText}
                            type="submit" 
                            className= "w-full text-center text-white py-3 mt-4 bg-indigo-600 disabled:bg-indigo-400 rounded-lg hover:bg-indigo-500 cursor-pointer disabled:cursor-not-allowed font-semibold shadow-md transition"
                        >
                           {loading?"wait...":"Save location"} 
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LocationModal;