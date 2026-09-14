import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";

function NotificationIcon(){
  const {unreadCount} = useSocket();
  // let unreadCount = 0;
  const navigate = useNavigate();

  return (
   <button onClick={() => navigate('/notifications')} className="relative">
      🔔
      {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
    </button>
  )
}

export default NotificationIcon;