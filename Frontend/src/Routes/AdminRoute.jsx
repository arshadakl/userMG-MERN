import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../components/user/Login/Login'
import Dashboard from '../components/admin/pages/Dashboard'
import AdminLoginAuth from '../Authentication/AdminLoginAuth'

function AdminRoute() {
    return (
        <Routes>
            <Route path='/' element={<AdminLoginAuth> <Dashboard/> </AdminLoginAuth>} />
            <Route path='/login' element={<Login authFor={"admin"}/>} />

        </Routes>
    )
}

export default AdminRoute
