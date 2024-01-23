import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../components/user/Login/Login'
import Dashboard from '../components/admin/pages/Dashboard'
import AdminLoginAuth from '../Authentication/AdminLoginAuth'
import EditPage from '../components/admin/pages/EditPage'
import AddUser from '../components/admin/addUser/AddUser'
import UserAddPage from '../components/admin/pages/UserAddPage'

function AdminRoute() {
    return (
        <Routes>
            <Route path='/' element={<AdminLoginAuth> <Dashboard/> </AdminLoginAuth>} />
            <Route path='/login' element={<Login authFor={"admin"}/>} />
            <Route path='/edituser/:userid' element={<AdminLoginAuth><EditPage/></AdminLoginAuth>} />
            <Route path='/adduser' element={<AdminLoginAuth><UserAddPage/></AdminLoginAuth>} />

        </Routes>
    )
}

export default AdminRoute
