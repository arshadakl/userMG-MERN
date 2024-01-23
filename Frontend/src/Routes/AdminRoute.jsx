import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../components/user/Login/Login'
import Dashboard from '../components/admin/pages/Dashboard'
import AdminLoginAuth from '../Authentication/AdminLoginAuth'
import EditPage from '../components/admin/pages/EditPage'

function AdminRoute() {
    return (
        <Routes>
            <Route path='/' element={<AdminLoginAuth> <Dashboard/> </AdminLoginAuth>} />
            <Route path='/login' element={<Login authFor={"admin"}/>} />
            <Route path='/edituser/:userid' element={<AdminLoginAuth><EditPage/></AdminLoginAuth>} />

        </Routes>
    )
}

export default AdminRoute
