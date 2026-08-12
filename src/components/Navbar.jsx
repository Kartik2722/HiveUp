import React from "react";
import { NavLink, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import hiveup from "../images/hiveup3.png"
import toast from "react-hot-toast";

export default function Navbar() {
    const [searchParams] = useSearchParams();
    const editId = searchParams.get("edit");
    const EditStatus = Boolean(editId);
    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    const handleLogout = () => {

        localStorage.removeItem("token");
        
        
        setUser(null);
        navigate("/",{replace:true});
       



    }

    const navClass = ({ isActive }) =>
  `font-semibold pb-1 transition-colors ${
    isActive
      ? "text-indigo-700 border-b-2 border-indigo-700"
      : "text-gray-600 hover:text-indigo-700"
  }`;
// bg-gradient-to-b from bg-gray-50  to-white  
    return (
        // hover:text-indigo-700
        <nav className="  w-full   shadow-md bg-white bg-gradient-to-b from bg-white to-pink-50 px-6 md:px-10 h-20 py-4 flex items-center justify-between  ">
            <div className="  text-xl font-bold    text-indigo-700">
                <img src={hiveup} className="h-18  object-contain" alt="" />
            </div>

            <div className="hidden md:w-[350px] md:flex items-center justify-evenly   gap-8 text-md font-semibold text-gray-800">
                <NavLink to="/" className= {navClass}>Home</NavLink>
                <NavLink to="/users/posts" end className= {navClass}>Feed</NavLink>
                <NavLink to="/users/Create-Posts" className= {navClass}>{EditStatus?"Update":"Create"}</NavLink>
                <NavLink to="/users/posts/mine" className={navClass}>myPosts</NavLink>
            </div>

            <div className="flex items-center gap-7 ">
                {user && <div className="flex items-center  px-7 py-2 bg-white text-grey-50 rounded-full font-semibold text-sm shadow-sm">

                    {user.avatar ? <div className="mr-[7px] h-10 ">
                        <img src={user.avatar} className="rounded-full h-full object-contain" alt="" />
                    </div> : <div className="w-9 h-9 mr-[7px]   rounded-full bg-slate-200   text-black flex items-center justify-center text-xl font-semibold uppercase">
                        {user.username?.charAt(0)}</div>
                        
                }


                    <div> Hi, {user.username.split(" ")[0]}</div>
                </div>}
                {user ? (
                    <button onClick={handleLogout} className="bg-indigo-700 text-white text-md font-medium px-5 py-2 rounded-xl hover:bg-indigo-800 transition">
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to='/login' className="bg-white shadow-sm text-black text-md font-medium px-5 py-2 rounded-2xl hover:bg-gray-50 transition">Login</Link>

                        <Link to='/SignUp' className="bg-indigo-700 shadow-sm text-white text-md font-medium px-5 py-2 rounded-2xl hover:bg-indigo-800 transition">Sign Up</Link>
                    </>
                )}


            </div>
        </nav>
    )
}