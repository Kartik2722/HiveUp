import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
const WS_API_URL = import.meta.env.REACT_APP_WS_URL;
const API_URL = import.meta.env.VITE_API_URL

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const { user } = useAuth();
  const wsRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [Loading, setLoading] = useState(false);

  const FetchAllNotifications = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/v1/notifications/`, {
        methods: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data) {
        setNotifications(data);
        setLoading(false);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.log("error occur", error);
      toast.error("Error Ocuur", error);
    }
  };

  useEffect(() => {
    console.log("hii");

    const fetchUnreadCount = async () => {
      if (!user) return;
      try {
        // `${API_URL}/api/v1/notifications/unread`
        let token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/api/v1/notifications/unread`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log(data);
        if (data.Count) {
          setUnreadCount(data.Count);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUnreadCount();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    let token = localStorage.getItem("token");
    let retryTimer;

    function connect() {
      const ws = new WebSocket(`wss://auth2026.onrender.com?token=${token}`);
      wsRef.current = ws;
      // toast.success("connected to sockets: ",ws);
      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type === "NEW_NOTIFICATION") {
          setNotifications((prev) => [data.notification, ...prev]);
          setUnreadCount((prev) => prev + 1);
        }
      };

      ws.onclose = () => {
        retryTimer = setTimeout(connect, 3000);
      };
      ws.onerror = () => ws.close();
    }
    connect();

    return () => {
      clearTimeout(retryTimer);
      wsRef.current?.close();
    };
  }, [user]);

  return (
    <SocketContext.Provider
      value={{
        notifications,
        setNotifications,
        unreadCount,
        setUnreadCount,
        Loading,
        FetchAllNotifications,
        wsRef,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
