import React, { useState } from 'react'
import './Login.css'
import { UserLogin } from '../../api/userApi'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validationErr, setValidationErr] = useState('')

    const handleLogin = (e) => {
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
        UserLogin({ email, password }).then((res) => {

        })
    }
    return (
        <>
            <div className="limiter col-12">
                <div className="container-login100 ">
                    <div className="wrap-login100 pb-5 ">
                        <form onSubmit={(e) => handleLogin(e)} >
                            <span className="login100-form-title p-b-26 mb-4">Welcome</span>
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
                        <h1 className=" text-center fs-6">
                            <a onClick={()=>navigate('/signup')} className="text-dark" style={{cursor:'pointer'}}>
                                Don't have an account
                            </a>
                        </h1>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login
