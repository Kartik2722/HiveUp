import React from 'react';
import SignUp from './Pages/SignUp';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Pages/Login';

import Home from './Pages/Home';
import PostForm1 from './components/PostForm1';

import AuthLoader from './components/AuthLoader';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';
import { Toaster } from "react-hot-toast"
import Feed from './components/feed';
import PostProtectedRoute1 from './components/PostProtectedRoute1';
import PostProtectedRoute2 from './components/PostProtectedRoute2';
import { PostProvider } from './context/PostContext';
import AllPostsPage from './components/AllPostsPage';
import MyPostsPage from './components/MyPostsPage';
import DeleteModal from './components/DeleteModal';
import { SocketProvider } from './context/SocketContext';





function App() {


  return (
    <>
      <Toaster position='top-right' />
      <Router>
        <AuthProvider>
       <SocketProvider>
          


          <Routes>
            {/* <Route path="/delete" element={<DeleteModal/>}/> */}
            <Route element={<MainLayout />}>

              <Route path="/" element={
                <AuthLoader>
                  <Home />
                </AuthLoader>
              } />

              <Route path='/users/Create-posts' element={

                <ProtectedRoute>
                  <PostForm1 />
                </ProtectedRoute>


              } />

              {/* <Route path='/users/posts' element={
                <PostProtectedRoute2>
                  <PostProvider>
                    <PostProtectedRoute1>

                      <Feed></Feed>
                    </PostProtectedRoute1>

                  </PostProvider>
                </PostProtectedRoute2>

              } /> */}

              <Route path='/users/posts'

                element={

                  <PostProtectedRoute2>
                    <PostProvider>
                      <AllPostsPage />
                    </PostProvider>

                  </PostProtectedRoute2>
                }

              />


                <Route path='/users/posts/mine'

                element={

                  <PostProtectedRoute2>
                    <PostProvider>
                      <MyPostsPage />
                    </PostProvider>

                  </PostProtectedRoute2>
                }

              />



            </Route>

            {/* <Route path='/posts' element={<Feed/>}></Route> */}
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />





          </Routes>

      </SocketProvider> 
        </AuthProvider>

      </Router>

    </>

  )
}

export default App;