import React from "react";
// import Post from "./Post";
import Post from "./Post1";
import { usePost } from "../context/PostContext";
import { useAuth } from "../context/AuthContext";
import NoPostYet from '../images/NoPostYet2.png';


export default function Feed() {
  // const { user } = useAuth();
  const { Posts } = usePost();
  // console.log(Posts);

  // const {PostContent,Location,image} = po


  return (
    <div className="flex flex-col items-center  gap-7 py-10  bg-gradient-to-b from bg-pink-50 via-purple-100 to-indigo-50 mt-  ">
      
      {Posts.length === 0 ? <div className="font-semibold  flex items-center justify-center"><img src={NoPostYet} className="  h-110" alt="" /></div>:Posts.map((post, index) => {
        return (
        <Post
          key={post._id}
          createdAt={post.createdAt}
          PostId = {post._id}
          PostUserId = {post.userId._id}
          image={post.image ? post.image : null}
          username={post.userId.username}
          userProfile={post.userId.avatar }
          timeAgo={post?.createdAt ? new Date(post.createdAt).toLocaleDateString().replaceAll('/','-') : ""}
          Location={post.Location}
          PostContent={post.PostContent}
          likes={post.likes.length}
          Likedarr={post.likes}
          commentCount={post.commentCount}
        />
        )
      })}
      
    </div>
  );
}



      {/* <Post
        avatar="https://i.pravatar.cc/40?img=8"
        name="Jordan Smith"
        timeAgo="5 hours ago"
        role="Tech Lead"
        content="The new UI updates are looking incredibly sharp. Love the focus on soft surfaces and human-centric geometry. 🎨"
        likes={86}
        comments={12}
        shares={0}
      /> */}