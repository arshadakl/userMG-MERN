import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import UserRoute from './Routes/userRoute'
import AdminRoute from './Routes/adminRoute'


function App() {

  return (
   <BrowserRouter>
   <Routes>
      <Route path='/*' element={<UserRoute/>} />
      <Route path='/admin/*' element={<AdminRoute/>} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
