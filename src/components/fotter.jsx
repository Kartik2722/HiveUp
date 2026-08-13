import React from "react";

export default function Footer() {
  return (
    // border-t border-indigo-100
    <footer className="bg-gradient-to-b from bg-pink-50 via-purple-100 to-indigo-50  w-full md:h-70  px-6 md:px-10 py-6   flex flex-col md:flex-row md:items-center items-start justify-evenly  md:gap-110  gap-10">

      <div className=" p-2 md:w-1/4 w-ful flex md:flex-col flex-row gap-2 r">

        <div className=" flex flex-row gap-1 items-center ">
          <div className="">
            <img src={'/icon_128.png'} className="md:h-14 md:w-14 h-9 w-9" alt="HiveUp" />
          </div>
          <div className=" font-bold text-indigo-700 text-2xl font-sans"><span className="text-black">Hive</span>Up</div>
        </div>


        <div className=" pl-1 text-gray-800  break-words leading-relaxed">
          Fostering meaningful social connection and digital well-being in  a modern, human centric space.
        </div>

      </div>


      <div className=" grid grid-cols-3 md:grid-cols-3 md:gap-12 gap-9 md:w-1/3 w-full">
        <div className="">
          <p className="font-semibold text-md py-2">Platform</p>
          <ul className="space-y-2">
            <li>Feed</li>
            <li>Explore</li>
            <li>Groups</li>
            <li>Create</li>
          </ul>
        </div>
        <div className=" ">
          <p className="font-semibold text-md  py-2">Community</p>
          <ul className="space-y-2">
            <li>Guidelines</li>
            <li>Help center</li>
            <li>Safety</li>
            
          </ul>
        </div>
        <div className="  ">

          <p className="font-semibold text-md  py-2">Legal</p>
          <ul className="p-1 space-y-2   list-none">
            <li>Terms of Policy</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
            
          </ul>
        </div>
      </div>
    </footer>
  );
}