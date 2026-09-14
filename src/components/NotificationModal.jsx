// components/NotificationsPanel.jsx
import React, { useState } from "react";
import { useSocket } from "../context/SocketContext";
import toast from "react-hot-toast";

export default function NotificationsPanel({ setopen }) {
  const { notifications, setNotifications, Loading, setUnreadCount } =
    useSocket();
  // const [notifications, setNotifications] = useState(dummyNotifications);

  const handleMarkAllRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    // real app me: await fetch('/api/notifications/read-all', { method: 'PATCH', headers })
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("${API_URL}/api/v1/notifications/read-all", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setUnreadCount(0);
      } else {
        console.log(res);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="absolute z-1 right-10 top-25 w-[360px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden ">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h3 className="text-base font-bold text-gray-900">Notifications</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={handleMarkAllRead}
            className="text-xs font-medium text-indigo-600 hover:underline"
          >
            Mark all as read
          </button>
          <button
            onClick={() => {
              setopen((prev) => !prev);
            }}
            className="w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 cursor-pointer"
          >
            ✕
          </button>
        </div>
      </div>

      {/* List */}

      {Loading ? (
        <div className=" text-center font-medium">Loading...</div>
      ) : (
        <div className="max-h-[360px] overflow-y-auto divide-y divide-gray-50 cursor-pointer">
          {notifications.length === 0 ? (
            <div className="py-10 text-center text-sm text-gray-400">
              No Notifications
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                className={`flex gap-3 px-4 py-3 ${!n.isRead ? "bg-indigo-50/40" : "bg-white"}`}
              >
                <div
                  className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-gray-700 text-sm font-semibold"
                  style={{
                    backgroundColor: "white",
                    border: "0.1px solid gray",
                  }}
                >
                  {n.sender.username.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 leading-snug">
                    <span className="font-semibold">
                      {n.sender.username.split(" ")[0]}
                    </span>{" "}
                    <span className="text-gray-600">{n.message}</span>
                  </p>
                  <span className="text-xs text-gray-400">2hr ago</span>
                </div>

                {!n.isRead && (
                  <span className="w-2 h-2 rounded-full bg-indigo-600 flex-shrink-0 mt-1.5" />
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
