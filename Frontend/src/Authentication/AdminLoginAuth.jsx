import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function AdminLoginAuth({children}) {
    const navigate = useNavigate()
    const hasToken = Boolean(localStorage.getItem('adminToken'))

    useEffect(() => {
        if (!hasToken) {
            navigate('/admin/login')
        }
    }, [hasToken, navigate])

    return hasToken ? children : null
}

export default AdminLoginAuth
