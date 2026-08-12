import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import DeleteModal from "./DeleteModal";
import { usePost } from "../context/PostContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdMoreVert } from "react-icons/md"



const ThreeDotMenu = ({ PostUserId, PostId }) => {
    const { Posts, setPosts } = usePost();
    const { user } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [openmodal, setopenmodal] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (openmodal) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        // Cleanup when component unmounts
        return () => document.body.classList.remove('overflow-hidden');
    }, [openmodal]);

    const onDelete = async () => {
        setopenmodal((prev)=>!prev);
        const updatedPosts = Posts.filter((post) => {
            return post._id !== PostId

        });
        setPosts(updatedPosts);

        try{
            const token =  localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/v1/users/posts/${PostId}`,{
                method:"DELETE",
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const data = await response.json();

            if(response.ok && data.message){
                toast.success("Post Permanently deleted");
                // console.log(data.message);
            }else{
                toast.error(data.message);
                // console.log(response);
            }
        }catch(error){
            toast.error(`${error}`);

        }



    }
    return <>
        {
            (PostUserId === user._id) &&
            <div className="relative">
                <button
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="text-gray-400 hover:text-gray-600 px-2 text-lg leading-none cursor-pointer"
                >
                   <MdMoreVert className="inline h-6 w-6"/>
                </button>

                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-lg shadow-md z-10 overflow-hidden">
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={()=>{navigate(`/users/Create-posts?edit=${PostId}`)}}>
                            Edit
                        </button>
                        {/* <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                Report
              </button> */}
                        <button onClick={() => { setopenmodal(true) }} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50">
                            Delete
                        </button>
                    </div>
                )}
            </div>
        }
        {
            openmodal && (<DeleteModal onclose={() => { setopenmodal(false) }} onDelete={onDelete} />)
        }

    </>
}

export default ThreeDotMenu;