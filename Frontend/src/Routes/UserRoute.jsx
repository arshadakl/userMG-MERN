import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';

function UserRoute() {
  return (
   <Routes>
    <Route path='/login' element={<Login/>} />
    <Route path='/signup' element={<Signup/>} />
   </Routes>
  )
}

export default UserRoute;
