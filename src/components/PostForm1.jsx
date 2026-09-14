import React, { useEffect, useState } from "react";
import image from "../images/image.png";
import location1 from "../images/location.png";
import smiley from "../images/smiley.png";
import EmojiPicker from "emoji-picker-react";
import LocationModal from "./LocationModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
const API_URL = import.meta.env.VITE_API_URL;

export default function CreatePost() {
  const { user } = useAuth();
  const Navigate = useNavigate();
  const [text, setText] = useState("");
  const maxChars = 280;
  const [showEmoji, setShowEmoji] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [location, setLocation] = useState("");

  const [Image, setImage] = useState(null);
  const [preview, setpreview] = useState(null);

  const [loading, showLoading] = useState(false);
  const [getPostLoading, setgetPostLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");

  const EditStatus = Boolean(editId);

  // yeh function textarea me postcontent ka chnage handler hai

  const changeHandler = (e) => {
    const value = e.target.value;
    setText(value.length <= maxChars ? value : value.slice(0, maxChars));
  };

  // yeh function ka kaam ---> update mode me post ka data fetch krke form pre fill krna  isko useEffect me call kra hai jab Editstatus true ho
  const Fetchdata = async () => {
    if (!EditStatus) return;

    setgetPostLoading(true);

    // ${API_URL}
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/v1/users/posts/${editId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      // console.log(response);

      if (response.ok && data.success) {
        setText(data.Post.PostContent || "");
        setLocation(data.Post.Location || "");
        if (data.Post.image) {
          // data.Post.image = `${API_URL}${data.Post.image}`;

          setpreview(data.Post.image);
        }
      } else {
        // console.log(response,data);
        toast.error(data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error);
    } finally {
      setgetPostLoading(false);
    }
  };

  useEffect(() => {
    Fetchdata();
  }, [editId]);

  // yeh fnction create post and update post dono ko hanle kr leta hai kyoki api change kr di jatti hai
  const submitPost = async () => {
    showLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      return Navigate("/login");
    }
    const formData = new FormData();
    if (text) formData.append("PostContent", text);
    if (location) formData.append("Location", location);
    // console.log(formData);

    if (Image) formData.append("image", Image);

    try {
      const SubmitPostApi = `${API_URL}/api/v1/users/posts`;
      const UpdatePostApi = `${API_URL}/api/v1/users/posts/${editId}`;
      const method = EditStatus ? "PUT" : "POST";
      const FinalApi = EditStatus ? UpdatePostApi : SubmitPostApi;
      const res = await fetch(FinalApi, {
        method: method,
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(data.message, { duration: 5000 });
        Navigate("/users/posts/mine");
      } else {
        toast.error(data.message, { duration: 6000 });
        // console.log(data.message);
      }
    } catch (err) {
      // console.log(err);
      // console.log(err, res.status);
      toast.error(err, { duration: 6000 });
    } finally {
      showLoading(false);
      setText("");
      setImage(null);
      setpreview(null);
      setLocation("");
    }
  };

  // yeh function image ke prview ki state and jo image object hai uski state manage krta hai
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    // console.log(file);
    // console.log(e.target.files);
    setImage(file);
    setpreview(URL.createObjectURL(file)); //preview k liye
  };

  return (
    //  bg-gradient-to-b from bg-gray-100  to-white
    <>
      {getPostLoading ? (
        <Spinner text="wait...." fullScreen={true} />
      ) : (
        <div className="relative min-h-[85vh]  bg-gradient-to-b from bg-pink-50 via-purple-100 to-indigo-50 px-6 py-16 flex flex-col items-center">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {" "}
              {EditStatus ? "Update Your" : "Create"} Post
            </h1>
            <p className="text-gray-500">
              Connect with your community through a new thought
            </p>
          </div>

          {/* Post box */}
          <div className="w-full max-w-2xl   bg-white rounded-2xl shadow-md  p-6">
            <div className="flex   p-1">
              <div className=" ">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt=""
                    className=" w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 mr-[7px] rounded-full bg-slate-200   text-black flex items-center justify-center text-xl font-semibold uppercase">
                    {user.username?.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4  p-1 flex-1 ">
                <textarea
                  name=""
                  id=""
                  value={text}
                  onChange={changeHandler}
                  placeholder="Share what's on your mind...."
                  rows={10}
                  className=" w-full resize-none outline-none text-gray-700 placeholder-gray-400 text-base"
                ></textarea>

                <div className=" flex justify-start">
                  {location && (
                    <div className=" inline-flex items-center gap-1.5 self-start bg-indigo-50 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full w-fit">
                      📍 {location}
                      <button
                        type="button"
                        onClick={() => setLocation("")}
                        className="ml-1 text-indigo-400 hover:text-indigo-700 font-bold cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  {preview && (
                    <div className="relative">
                      <img
                        src={preview}
                        className=" rounded-lg w-20 h-20"
                        alt=""
                      />
                      <button
                        className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black"
                        onClick={() => {
                          setImage(null);
                          setpreview(null);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-300 mt-4 pt-4 flex items-center justify-between">
              <div className="flex items-center justify-evenly gap-4 text-indigo-600 w-[35%]">
                <label className="cursor-pointer" title="Add image">
                  <img src={image} alt="upload" className="h-7 w-7" />
                  <input
                    type="file"
                    value={Image ? undefined : ""}
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>

                <div className="relative" title="Add emoji">
                  <img
                    src={smiley}
                    alt="upload"
                    className="h-7 w-7 cursor-pointer"
                    onClick={() => setShowEmoji((prev) => !prev)}
                  />

                  {showEmoji && (
                    <div className="absolute bottom-[-50px] right-23 mt-3 z-30">
                      <EmojiPicker
                        onEmojiClick={(emojiData) => {
                          setText((prev) => prev + emojiData.emoji);
                        }}
                      />
                    </div>
                  )}
                </div>

                <div
                  className="cursor-pointer"
                  title="Add location"
                  onClick={() => setShowLocationModal(true)}
                >
                  <img src={location1} alt="location" className="h-7 w-7" />
                </div>
              </div>
              <div className="relative inline-flex items-center justify center rounded-xl">
                <button
                  disabled={!text || loading}
                  onClick={submitPost}
                  className={`bg-indigo-700 disabled:bg-indigo-500 disabled:cursor-not-allowed ${loading ? "disabled:bg-indigo-500 disabled:cursor-not-allowed" : ""} hover:bg-indigo-600 transition  font-semibold p-3 px-4 cursor-pointer rounded-xl   ${loading ? "text-transparent" : "text-white"} `}
                >
                  {EditStatus ? "Update" : "Create"}{" "}
                </button>
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className=" w-5 h-5 border-4 border-indigo-700/20 border-t-indigo-900 rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showLocationModal && (
        <LocationModal
          onClose={() => setShowLocationModal(false)}
          setLocation={setLocation}
        />
      )}
    </>
  );
}
