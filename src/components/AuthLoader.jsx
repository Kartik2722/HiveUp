import React from "react";
import { useAuth } from "../context/AuthContext";
const AuthLoader = ({children})=>{

    const {loading} = useAuth();





return (
    <div className="relative min-h-screen">
      {/* Actual app content, hamesha render hoga background me */}
      <div className={loading ? "pointer-events-none select-none" : ""}>
        {children}
      </div>

      {/* Blurry loading overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/40">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-700 rounded-full animate-spin" />
            <p className="text-gray-600 font-medium text-sm">
              Authenticate Please wait...
            </p>
          </div>
        </div>
      )}
    </div>
  );


  }
  export default AuthLoader;