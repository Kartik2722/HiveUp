import React from "react";
import { useState } from "react";
import { usePost } from "../context/PostContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";





 const PostProtectedRoute1 = ({ children }) => {
    const navigate = useNavigate();
    const { Posts, Loading } = usePost();
    // const { user, loading } = useAuth();


    if (Loading) {
        return  <Spinner text="fetching Posts...." fullScreen={true} />

        
    }



    return children;

}

export default PostProtectedRoute1