import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import UserRoute from './Routes/userRoute'


function App() {

  return (
   <BrowserRouter>
   <Routes>
      <Route path='/*' element={<UserRoute/>} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
