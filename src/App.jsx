import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, you can access user details here
        console.log("User is signed in:", user);
        navigate('/');
      } else {
        // User is signed out
        console.log("No user is signed in.");
        navigate('/login');
      }
    })
  }, [])
  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>

    </div>
  )
}

export default App
