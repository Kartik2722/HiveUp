import React, { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

// 1. Ek blank  cloud (conetext) bnaye

const AuthContext = createContext();

// samjhne ke liye ek custom hook bnaye jis se kisi bhi file me easilly mile  (useAuth)

export const useAuth = () => useContext(AuthContext);

// 2.AuthProvider:Ek trah ka wrpper hai jo App.jsx ko cover krega

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // console.log("hii");

  // adding a new loading state

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
    } else {
      try {
        const response = await fetch(`${API_URL}/api/v1/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response);
        const data = await response.json();
        if (response.ok && data.success) {
          // console.log(data.user);
          setUser(data.user);
        } else {
          // toast.error(data.message);
          setUser(null);
        }
      } catch (error) {
        console.log(error);
        toast.error(`${error}`);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    // Provider k andar user ki jankari,setUser,aur check function daal diye

    <AuthContext.Provider value={{ user, setUser, checkLoginStatus, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
