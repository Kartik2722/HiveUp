import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-indigo-50/40 px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-indigo-100">
      <div>
        <div className="text-lg font-bold text-indigo-700">ConnectHuman</div>
        <p className="text-xs text-gray-500">© 2024 ConnectHuman. All rights reserved.</p>
      </div>

      <div className="flex items-center gap-6 text-sm text-gray-700">
        <a href="#" className="hover:text-indigo-700">Terms</a>
        <a href="#" className="hover:text-indigo-700">Privacy</a>
        <a href="#" className="hover:text-indigo-700">Help</a>
        <a href="#" className="hover:text-indigo-700">About</a>
      </div>

      <div className="flex items-center gap-3">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200">
          🔗
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200">
          🌐
        </button>
      </div>
    </footer>
  );
}