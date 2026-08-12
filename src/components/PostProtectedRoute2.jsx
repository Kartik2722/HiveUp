import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
 const ProtectedRoute2 = ({children})=>{

    const {user,loading} = useAuth();

    // jab tak user check nahi ho jata ---> spinner show

    if(loading){

        return (
            <>
            <Spinner text="Authenticate please wait..." fullScreen = {true} />
            </>
        )
        
    }

    // Agar user nahi hai (logged out) to login bhej do

    if(!user){
            return <>( 
            <Navigate to="/login" replace></Navigate>
                
            )</>
    }

    // agar user logged in hai 
    return children;




}

export default ProtectedRoute2;