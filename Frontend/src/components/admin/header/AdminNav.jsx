import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOutAdmin } from '../../../redux/adminSlice'
import { useNavigate } from 'react-router-dom'

function AdminNav() {
    const navigate = useNavigate()
    const { email } = useSelector((state) => state.admin)

    const dispatch = useDispatch()
    return (
        <header className="font-monospace">
            <nav className="navbar bg-dark text-white py-4">
                <div className="container-fluid">
                    <a className="navbar-brand px-5 text-white fs-4">Admin Dashboard</a>

                    <div className="dropdown">
                        <button className="btn btn-outline-light dropdown-toggle mx-5" data-bs-toggle="dropdown" aria-expanded="false">
                            {email}
                        </button>

                        <ul className="dropdown-menu ">
                            <li onClick={() => dispatch(logOutAdmin())} style={{ cursor: 'pointer' }}>
                                <a className="dropdown-item" >
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default AdminNav
