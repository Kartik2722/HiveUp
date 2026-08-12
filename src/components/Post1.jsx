import React, { useEffect, useState } from "react";
import like from '../images/like.png';
import unlike from '../images/unlike.png';
import close from '../images/close.png';
import comment1 from '../images/comment.png'
import { useAuth } from "../context/AuthContext";
import { PulseLoader } from 'react-spinners';
// import CommentBox from "./CommentBox";
import { IoMdSend } from "react-icons/io";
import { toast } from 'react-hot-toast';
import isEqual from 'lodash.isEqual';
import { RiDeleteBin7Line } from "react-icons/ri";
import ThreeDotMenu from "./Threedot";
import { formatDistanceToNow } from "date-fns";
   const API_URL = import.meta.env.VITE_API_URL;



export default function Post({
  createdAt,
  PostId,
  PostUserId,
  image,
  username,
  userProfile,
  timeAgo,
  Location,
  PostContent,
  likes,
  commentCount,
  Likedarr

}) {
  const { user } = useAuth();

  const isLiked = Likedarr.includes(user._id);
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [disabled, setdisabled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [open, setopen] = useState(false);
  const [comments, setcomments] = useState([]);
  const [mycomment, setmycomment] = useState("");
  const [NoOfcomments, setNoOfcomments] = useState(commentCount);



  // handlig like 
  const toggleLike = async () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));

    // const PostId =  PostId;
    try {
      setdisabled(true);
      const token = localStorage.getItem("token");
      const URL = `${API_URL}/api/v1/posts/${PostId}/like`;
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log(response);
      const data = await response.json();

      if (response.ok && data.success) {
        // console.log(data);


      } else {
        // console.log(response);
        setLiked((prev) => !prev);
        setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
        toast.error(data.message);
      }

    } catch (error) {
      // console.log(error);
      toast.error(`${error}`);

    } finally {
      setdisabled(false);
    }

  };



  // handling comment box open closing and get comments api caling
  const handleCommentBox = async () => {
    setopen((prev) => !prev);


    if (!open) {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/api/v1/posts/${PostId}/comment`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const data = await response.json();

        if (response.ok && data.comments) {
          setLoading(false);
          // console.log(response);
          // console.log(data);
          setcomments(data.comments);
        } else {
          // console.log(response);
          setLoading(true);
          toast.error("Bad request", response.ok);
        }
      } catch (error) {
        console.log(error);
        toast.error("Network Problem or Wrong api url");
        setLoading(true);



      }

      // finally {
      //   setLoading(false);
      // }
    }
  }

  // comment box input vlaue state nothing else 
  const handlePostcomment = (e) => {
    setmycomment(e.target.value);

  }



  // handling submiting comment 
  const handlecommentsubmit = async (e) => {
    // console.log("hii");
    e.preventDefault();
    setcomments((prev) => [...prev, {
      comment: mycomment, UserId: {
        _id: user._id,
        username: user.username,
        avatar: user.avatar,

      }
    }])
    setNoOfcomments((prev) => prev + 1);

    // setmycomment("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/v1/posts/${PostId}/comment`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ mycomment })
      })

      const data = await response.json();
      // console.log(response);
      // console.log(data);
      setmycomment("");
      if (response.ok) {

        // console.log(data);
      } else {
        // console.log(response);
        toast.error(`error occured while submit coment ${data.message}`);
        setcomments((prev) => {
          return comments.filter((commentobj) => {
            return !isEqual(commentobj, prev);
          })
        })


      }
    } catch (error) {
      // console.log(error);
      toast.error(`${error}`);

    } finally {


    }



  }


  // handling deleting comment
  const handlDeleteComment = async (commentId) => {
    const updatedComments = comments.filter((comobj, index) => {
      return commentId !== comobj._id;
    })

    setNoOfcomments((prev) => prev - 1);
    setcomments(updatedComments);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/v1/posts/${commentId}/comment`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }

      })

      const data = await response.json();
      if (response.ok && data.success) {
        // console.log(data.message);
        toast.success("Comment deleted sucessfully");
      } else {
        // console.log()
        toast.error(data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error(`Network problem or wrong api request,${error}`);
    }

  }



  return (
    <>

      <div className="w-full relative max-w-2xl bg-white  rounded-2xl shadow-sm p-6  relative shadow-xl ">

        {/* Comment box */}

        <div className={` px-4 py-8  origin-left  gap-5 flex flex-col   ml-2 shadow-xl bg-white absolute right-0 top-0 h-full left-full rounded-2xl  transition-all duration-250 ease-in ${open ? "w-75 opacity-100 scale-x-100" : " opacity-0 w-0 px-0 py-0 overflow-hidden scale-x-0 pointer-events-none"} `}>
          <div className=" absolute right-0 top-0 mt-2 mr-2" onClick={() => setopen((prev) => !prev)}>
            <img src={close} alt="" className="w-8 h-8 cursor-pointer" />
          </div>
          <div className="font-semibold text-xl  rounded-xl h-8 text-center">
            Comments

          </div>
          <form onSubmit={handlecommentsubmit}>
            <div className="flex gap-3 items-center ">


              <div>
                <input type="text" name="" id="" className="p-2 px-7 rounded-2xl bg-gray-100   outline-none" placeholder="write here..." onChange={handlePostcomment} value={mycomment} />
              </div>
              <div className="">
                <button type="submit" className="disabled:cursor-not-allowed p-1  cursor-pointer    rounded-full" disabled={!mycomment} >

                  <IoMdSend className="inline w-7 h-7" />

                </button>
              </div>


            </div>
          </form>

          <div className="flex flex-col gap-3 flex-1 overflow-y-auto relative  ">
            {Loading ? <div className="absolute top-50 right-27"><PulseLoader color="#0b0a14ff" size={8} /></div> :

              comments.length !== 0 ? comments.map((comment2, index) => {
                return <>

                  <div className="flex flex-row gap-3 p-2 rounded-md  " key={comment2._id}>
                    <div className=" shrink-0">
                      {comment2.UserId.avatar ? (
                        <img
                          src={comment2.UserId.avatar}
                          className="w-8 h-8 rounded-full object-cover"
                          alt=""
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold uppercase">
                          {comment2.UserId.username?.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col  flex-1 relative">
                      <div className="flex justify-between">
                        <p className="text-sm font-semibold text-gray-900">
                          {comment2.UserId.username}
                        </p>
                        {comment2.UserId._id === user._id &&
                          <p className="absolute right-0 top-0  rounded-full  flex p-1 hover:bg-gray-300 transition ease-in cursor-pointer" onClick={() => { handlDeleteComment(comment2._id) }}>
                            <RiDeleteBin7Line className="inline w-4 h-4   " />
                          </p>
                        }
                      </div>

                      <p className="text-sm text-gray-700 break-words">
                        {comment2.comment}
                      </p>
                    </div>


                  </div>

                </>
              }) : <div className="absolute top-50 right-27 font-semibold">No comments</div>
            }
          </div>

        </div>
        {/* bg-gradient-to-r from bg-gray-100 */}
        {/* Header */}
        <div className="flex items-start justify-between mb-3    to-white p-2 rounded-xl">
          <div className="flex items-center gap-3">
            {userProfile ? <img
              src={userProfile}
              alt={username}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover flex-shrink-0 "
            /> : <div className="w-10 h-10 rounded-full bg-slate-200    text-black flex items-center justify-center text-xl font-semibold uppercase ">
              {username?.charAt(0)}

            </div>}

            <div>
              <h3 className="font-semibold text-gray-900 leading-tight">{username}</h3>
              <p className="text-xs text-gray-500">
                {Location && <span>{Location} •  </span>} {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                {/* {timeAgo} 
              {role && <span>• {Location}</span>} */}
              </p>
            </div>
          </div>

          {/* Three-dot menu */}
          <ThreeDotMenu
            PostUserId={PostUserId}
            PostId={PostId}

          ></ThreeDotMenu>
        </div>

        {/* Content */}
        <p className="text-gray-700 text-[15px] leading-relaxed mb-4 whitespace-pre-line">
          {PostContent}
        </p>

        {/* Image */}
        {image && (
          <div className="mb-4  overflow-hidden ">
            <img
              src={image}
              alt="post"
              className="w-full max-h-96 object-contain rounded-xl"
            />
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center gap-8 pt-3 border-t border-gray-100 text-gray-500 text-sm" disabled={disabled}>
          <button
            onClick={toggleLike}
            className={`flex items-center gap-2 hover:text-indigo-600 transition ${liked ? "text-red-500" : ""
              }`}
          >
            <span>{liked ? <img src={like} className="w-7 h-7"></img> : <img src={unlike} className="w-7 h-7"></img>}</span>
            {likeCount}
          </button>

          <button className="flex items-center gap-2 hover:text-indigo-600 transition cursor-pointer" onClick={handleCommentBox}>
            <img src={comment1} alt="" className="w-7 h-7" /> {NoOfcomments}
          </button>


        </div>
      </div>
    </>
  );
}