import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function UserLoginAuth({children}) {
  const navigate = useNavigate()
  const hasToken = Boolean(localStorage.getItem('token'))

  useEffect(() => {
    if (!hasToken) {
      navigate('/login')
    }
  }, [hasToken, navigate])

  return hasToken ? children : null
}

export default UserLoginAuth
