//  import { useNavigate } from "react-router-dom";
import notification from "../images/notifacation.png";
import { useSocket } from "../context/SocketContext";

 

 function NotificationIcon1({setopen}){

  const {unreadCount,FetchAllNotifications} = useSocket();
  console.log(unreadCount);
  // const navigate = useNavigate();

  return (
    <>
     <div onClick={()=>{setopen((prev)=>!prev);FetchAllNotifications()}}  className="cursor-pointer hover:bg-gray-200 rounded-full p-1 transition ease-in-out">
            <div className=" relative">
              {unreadCount > 0 &&  <span className="absolute  right-[-20%] rounded-full px-[0.5rem]  bg-red-600 text-white  top-[-37%]">
                {unreadCount}
              </span>}
             
              <img src={notification} alt="" className="h-8" />
            </div>
          </div>
    </>
  )
 }

 export default NotificationIcon1;
 
