import React, { useState } from 'react'
import { createUser } from '../../../api/adminApi'
import { useNavigate } from 'react-router-dom'

function AddUser() {

    const [userName,setUserName] = useState('')
    const [fullName,setFullName] = useState('')
    const [email,setEmail] = useState('')
    const [mobile,setMobile] = useState('')
    const [password,setPassword] = useState('')
    const [validationErr,setValidationErr] = useState('')
    const navigate = useNavigate()

    
    const validateForm = () => {
        // Validation for each field
        if (userName.length < 3) {
          setValidationErr('Username must be at least 3 characters')
          return false;
        }
      
        if (fullName.length < 3) {
          setValidationErr('Full Name must be at least 3 characters')
          return false;
        }
      
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setValidationErr('Invalid email address')
          return false;
        }
      
        if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
          setValidationErr('Mobile number must be 10 digits')
          return false;
        }
      
        if (password.length < 3) {
          setValidationErr('Password must be at least 3 characters')
          return false;
        }
        setValidationErr("")
        return true;
      };
    // userName, fullName, email, mobile, password
    const submitHandler = async(e)=>{
        e.preventDefault()
        if (!validateForm()) {
            return;
          }
          createUser({userName,fullName,email,mobile,password}).then((res)=>{
            // console.log(res);
            if(!res.success){
                console.log("Request Failed..");
                setValidationErr(res.message);
                return
            }else{
                navigate('/admin')
            }
            

        })
    }
  return (
    
    <>
    <div className="container font-monospace">

<div className="container-fluid pb-5">
    <div className="card col-md-7 col-12 mx-auto mt-5 ">
        <div className="card-body h-100 ">
            <div className="dash-header  ">
                <div className="card ">
                    <div className="card-body dash-box">
                        <h1 className="fs-4  ">Add New User</h1>
                    </div>
                </div>

                <div className="card ">
                    <div className="card-body dash-box d-flex justify-content-start">
                        <form className="d-flex row mx-auto col-12 " onSubmit={(e)=>submitHandler(e)} >
                            <div className="mb-3">
                                <label className="form-label">User Name</label>
                                <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Full Name </label>
                                <input type="text" value={fullName} onChange={(e)=>setFullName(e.target.value)} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email </label>
                                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Mobile</label>
                                <input type="number" value={mobile} onChange={(e)=>setMobile(e.target.value)} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" />
                            </div>
                            <p className='text-danger text-center'>{validationErr}</p>
                            <button type='submit' className='btn btn-dark mt-3'>Save Changes</button>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
</div>
    </>
  )
}

export default AddUser
