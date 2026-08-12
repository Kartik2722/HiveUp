import React, { useEffect, useState, useContext, createContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;



// Ek blank cloud (context bnaye)
const PostContext = createContext();

// custom hook

export const usePost = () => useContext(PostContext);


export const PostProvider = ({ children }) => {
    const [Posts, setPosts] = useState([]);
    const [Loading, setLoading] = useState(false);
    const navigate = useNavigate();


    // useEffect(() => {
    //     getPosts();
    // }, []);

    // const getPosts = async () => {
    //     setLoading(true);

    //     const token = localStorage.getItem("token");

    //     if (!token)  {
    //     navigate("/", { replace: true });
    //     };

    //     try {
    //         const response = await fetch(`http://localhost:5000/api/v1/users/posts`, {
    //             method: 'GET',
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },


    //         });

    //         const data = await response.json();
    //         console.log(data);

    //         if (response.ok) {
    //             console.log(data);
    //             setPosts(data.Posts);
    //         } else {
    //             setPosts(null);
    //             // toast.error(`${data.message},status code:  ${response.status}`);
    //         }
    //     } catch (error) {
    //         toast.error(error);
    //         setPosts(null);

    //     } finally {
    //         setLoading(false);
    //     }

    // }


    const FetchPosts = async ({mode})=>{
        const BaseUrl = `${API_URL}/api/v1/users/posts`;
        const finalUrl = mode === "mine"?`${BaseUrl}/${mode}`:BaseUrl;
        
        try{
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await fetch(finalUrl,{
                method:'GET',
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            const data = await response.json();
            // console.log(data);
            if(response.ok){
                if(data.success){
                    setPosts(data.Posts);
                    


                }
            }else{
                setPosts([]);
                toast.error(`error occur: ${data.message},${data.error}`);
                // console.log(response);
                // console.log(data);
            }
        }catch(error){
            setPosts([]);
            toast.error(`error: ,${error.message}`);

        }finally{
            setLoading(false);
        }
    }

    return (
        <>

            <PostContext.Provider value={{ Posts, Loading,FetchPosts,setPosts }}>

                {children}
            </PostContext.Provider>
        </>
    )
}
