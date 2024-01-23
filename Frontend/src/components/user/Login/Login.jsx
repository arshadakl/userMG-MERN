import React, { useState } from 'react'
import './Login.css'
import { UserLogin } from '../../../api/userApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from '../../../redux/userSlice'
import { AdminLogin } from '../../../api/adminApi'
import { setAdminDetails } from '../../../redux/adminSlice'

function Login({ authFor }) {
    const isUser = authFor == "user" ? true : false
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validationErr, setValidationErr] = useState('')

    //user login function
    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(email, password);

        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        // Check if email and password are not empty after trimming
        if (!trimmedEmail || !trimmedPassword) {
            setValidationErr("Email and password are required")
            return;
        }
        setValidationErr('')

        //user login function
        const userHandler = async() => {
            const loginResponse = await UserLogin({ email, password })
            console.log(loginResponse);
            if (loginResponse.success) {
                localStorage.setItem("token", loginResponse.token)
                console.log(loginResponse.user._id);
                dispatch(setUserDetails({
                    id: loginResponse.user._id,
                    userName: loginResponse.user.userName,
                    fullName: loginResponse.user.fullName,
                    mobile: loginResponse.user.mobile,
                    email: loginResponse.user.email,
                    image: loginResponse.user.image,
                    token: loginResponse.token
                }))
                navigate('/')
            } else {
                setValidationErr(loginResponse.message)
            }
        }

        //admin login function
        const adminHandler = async()=>{
            const adminLoginResponse = await AdminLogin({ email, password })
            if (adminLoginResponse.success) {
                localStorage.setItem("adminToken", adminLoginResponse.token)
                dispatch(setAdminDetails({
                    id: adminLoginResponse.admin._id,
                    email:adminLoginResponse.admin.email
                }))
                navigate('/admin')
            } else {
                setValidationErr(adminLoginResponse.message)
            }
        }


        // 
        isUser ? userHandler() : adminHandler()
    }



    return (
        <>
            <div className="limiter col-12">
                <div className="container-login100 ">
                    <div className="wrap-login100 pb-5 ">
                        <form onSubmit={(e) => handleLogin(e)} >
                            <span className="login100-form-title p-b-26 mb-4">{isUser ? "Welcome" : "Admin"}</span>
                            <span className="login100-form-title p-b-48">
                                <i className="zmdi zmdi-font" />
                            </span>
                            <div className="wrap-input100 ">
                                <input value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="input100"
                                    placeholder="Email"
                                    type="email"
                                />
                            </div>
                            <div className="wrap-input100">
                                <input value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="input100"
                                    placeholder="Password"
                                    type="password"
                                />
                            </div>
                            <p className='text-danger text-center'>{validationErr}</p>

                            <div className="log-bt-area text-center">
                                <button type='submit' className="login-bt">Login</button>
                            </div>
                        </form>
                        <p id="username-error" />
                        {isUser ? <h1 className=" text-center fs-6">
                            <a onClick={() => navigate('/signup')} className="text-dark" style={{ cursor: 'pointer' }}>
                                Don't have an account
                            </a>
                        </h1> : null}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login
