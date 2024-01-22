import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../components/user/Login/Login';
import Signup from '../components/user/Signup/Signup';
import HomePage from '../components/user/pages/homePage';
import UserProfile from '../components/user/pages/UserProfile';
import UserLoginAuth from '../Authentication/UserLoginAuth';

function UserRoute() {
  return (
   <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/login' element={<Login authFor={"user"}/>} />
    <Route path='/signup' element={<Signup/>} />
    <Route path='/profile' element={<UserLoginAuth> <UserProfile/> </UserLoginAuth>} />
   </Routes>
  )
}

export default UserRoute;
