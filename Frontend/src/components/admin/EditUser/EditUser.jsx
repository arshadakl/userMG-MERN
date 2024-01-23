import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import { GetOneUser, UpdateUser } from '../../../api/adminApi'

function EditUser() {
    const {userid} = useParams()
    const [userName,setUserName] = useState('')
    const [fullName,setfullName] = useState('')
    const [mobile,setMobile] = useState('')
    const [id,setId] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        try {
            userid==undefined ? navigate('/admin') : null
            console.log(userid);
            GetOneUser(userid).then((res)=>{
                console.log(res);
                const {userName,fullName,mobile,_id} = res.user
                setUserName(userName);
                setMobile(mobile);
                setfullName(fullName)
                setId(_id)

            })
        } catch (error) {
            console.log(error);
        }
    }, [])


    const handleEdit = async(e)=>{
        try {
            e.preventDefault()
            const response = await UpdateUser({id,userName,mobile,fullName}) 
            if(response.success){
                navigate('/admin')
            }
        } catch (error) {
            
        }
    }

    return (
        <div className="container font-monospace">

            <div className="container-fluid pb-5">
                <div className="card col-md-10 col-12 mx-auto mt-5 ">
                    <div className="card-body h-100 ">
                        <div className="dash-header  ">
                            <div className="card ">
                                <div className="card-body dash-box">
                                    <h1 className="fs-4  ">Edit User Details</h1>
                                </div>
                            </div>

                            <div className="card ">
                                <div className="card-body dash-box d-flex justify-content-start">
                                    <form className="d-flex row mx-auto col-12 " onSubmit={(e)=>handleEdit(e)} >
                                        <div className="mb-3">
                                            <label className="form-label">User Name</label>
                                            <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Full Name </label>
                                            <input type="text" value={fullName} onChange={(e)=>setfullName(e.target.value)} className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Mobile</label>
                                            <input type="number" value={mobile} onChange={(e)=>setMobile(e.target.value)} className="form-control" />
                                        </div>

                                        <button type='submit' className='btn btn-dark mt-3'>Save Changes</button>

                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditUser
