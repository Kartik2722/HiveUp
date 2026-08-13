import React from "react";
import { Link } from "react-router-dom";
import sm from "../images/sm.png";
import herosectionPic from '../images/HerosectionPic.jpg';
import { useAuth } from "../context/AuthContext";
import p1 from '../images/p1.avif';
import p3 from '../images/p3.avif';
import p2 from '../images/p2.avif';

export default function Hero() {
  const {user} = useAuth();
  return (
    <>
    {/* bg-gradient-to-b from bg-gray-100  to-white */}
      {/* Hero Section */}
      <section className="px-6 md:px-16 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center  bg-gradient-to-b from bg-pink-50 via-purple-100 to-indigo-50  ">
        <div>

          <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            JOIN THE MOVEMENT
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Connect with your community through{" "}
            <span className="text-indigo-700">meaningful thoughts</span>
          </h1>
          <p className="text-gray-600 mb-8 max-w-md">
            A sanctuary for authentic digital interaction. Experience a social
            platform built for your well-being, where real human connection
            thrives without the noise.
          </p>


          <div className="flex items-center gap-4 mb-6">
            <button className="bg-indigo-700 text-white font-medium px-6 py-3 rounded-md hover:bg-indigo-800 transition">
              <Link to="/users/posts"> Get Started</Link>
             
            </button>
            <button className="border border-gray-300 text-gray-700 font-medium px-6 py-3 rounded-md hover:bg-gray-50 transition">
              Learn More
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[p1, p2, p3].map((i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full  bg-gray-300 border-2 border-white flex items-center justify-center"

                >
                   <img src={i} alt="" className="object-cover w-9 h-9 rounded-full" />
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-500">Joined by 10k+ humans this week</span>
          </div>

        </div>

        <div className="relative">
          <div className=" rounded-2xl  p-4 ">
            <div className="bg-gradient-to-br  from-indigo-100 to-purple-100  rounded-xl  flex items-center justify-center text-gray-400 text-sm shadow-xl">
             <img src={herosectionPic} alt="" className="rounded-2xl " />
                                     
            </div>
          </div>
          <div className="absolute top-4 right-4 bg-teal-400 text-white text-xs font-medium px-4 py-2 rounded-full shadow">
            ❤ Meaningful engagement
          </div>
          <div className="absolute -bottom-8 left-4 bg-white rounded-xl shadow-lg p-4 w-56">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-indigo-200" />
              <div className="h-2 bg-gray-200 rounded flex-1" />
            </div>
            <div className="h-2 bg-gray-100 rounded mb-1" />
            <div className="h-2 bg-gray-100 rounded w-3/4" />
          </div>
        </div>
      </section>

      {/* Built for Humans Section */}
      <section className="px-6 md:px-16 py-16 text-center  bg-gradient-to-b from bg-indigo-50 via-purple-100 to-pink-50">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Built for Humans, Not Algorithms
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-12">
          We've redesigned the social experience from the ground up to
          prioritize mental health and genuine community.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Authentic Posts - spans 2 cols */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-left flex flex-col md:flex-row items-center gap-6">
            <div>
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                ✨
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Authentic Posts</h3>
              <p className="text-gray-600 text-sm">
                Share what truly matters without the pressure of metrics. Our
                platform encourages depth and vulnerability over viral
                snippets.
              </p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-5 w-full md:w-56 flex-shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-indigo-300" />
                <div className="h-2 bg-indigo-200 rounded flex-1" />
              </div>
              <div className="h-2 bg-indigo-100 rounded mb-3" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-teal-300" />
                <div className="h-2 bg-indigo-100 rounded flex-1" />
              </div>
            </div>
          </div>

          {/* Community Engagement */}
          <div className="bg-indigo-700 text-white rounded-2xl p-8 text-left">
            <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center mb-4">
              👥
            </div>
            <h3 className="text-lg font-bold mb-2">Community Engagement</h3>
            <p className="text-indigo-100 text-sm mb-6">
              Meaningful discussions focused on shared interests and local
              impact. Find your people without the noise.
            </p>
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-indigo-400 border-2 border-indigo-700" >
                  
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-indigo-800 border-2 border-indigo-700 flex items-center justify-center text-xs">
                +24
              </div>
            </div>
          </div>

          {/* Digital Well-being */}
          <div className="bg-indigo-100 rounded-2xl p-8 text-left">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mb-4">
              🍃
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Digital Well-being</h3>
            <p className="text-gray-700 text-sm">
              Time-aware design that respects your attention. No infinite
              scrolls, no addictive loops—just connection.
            </p>
          </div>

          {/* Privacy First - spans 2 cols */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-left flex items-center gap-6">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-3xl text-indigo-600">
                🔒
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-teal-700 flex items-center justify-center text-white text-xs">
                🛡
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy First</h3>
              <p className="text-gray-600 text-sm">
                Your data is yours. We don't sell your personal information to
                advertisers. We're funded by users, not data brokers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
       {/* bg-gradient-to-b from-white to-indigo-50 */}
      <section className="px-6 md:px-16 py-24 text-center bg-gradient-to-b from bg-pink-50 via-purple-100 to-indigo-50">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ready for a better social experience?
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          Join thousands of others who have traded mindless scrolling for
          meaningful connection. It's time to ConnectHuman.
        </p>
        <div className="flex items-center justify-center gap-4">
          {!user && <button className="bg-indigo-700 text-white font-medium px-6 py-3 rounded-md hover:bg-indigo-800 transition">
            
             <Link to="/SignUp">Create Free Account</Link>
           
          </button>}  
          
          <button className="bg-indigo-100 text-indigo-700 font-medium px-6 py-3 rounded-md hover:bg-indigo-200 transition">
            Explore Public Groups
          </button>
        </div>
      </section>
    </>
  );
}