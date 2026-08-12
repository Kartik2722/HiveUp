import React from "react";

export default function Spinner({text,fullScreen}) {
  // { text = "Loading...", fullScreen = true }
  return (
    <div
      className={
        fullScreen
          ? "min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from bg-pink-50 via-purple-100 to-indigo-50"
          : "min-h-[60vh] flex flex-col items-center justify-center"
      }
    >
      <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
      {text && <p className="mt-4 text-slate-400 font-semibold">{text}</p>}
    </div>
  );
}