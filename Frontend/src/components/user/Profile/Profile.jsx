import React, { useState, useRef } from 'react'
import './profile.css'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateImage, UpdateUser } from '../../../api/userApi';
import { setUserDetails } from '../../../redux/userSlice';

function Profile() {
    const dispatch = useDispatch()
    const fileInputRef = useRef(null)
    const [isEdit, setIsEdit] = useState(false)
    const [isImgUpdate, setIsImgUpdate] = useState(false)
    const { id, userName, fullName, email, image, mobile ,token} = useSelector((state) => state.user)
    const baseImg = image ? image :`http://localhost:8080/users/defaultDp.jpg` 
    const [selectedFile, setSelectedFile] = useState(baseImg);
    const [profileImg, setProfileImg] = useState('')
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const [NewfullName, setfullName] = useState(fullName)
    const [NewUserName, setUserName] = useState(userName)
    const [Newmobile, setmobile] = useState(mobile)

    const handleUpdate = (e) => {
        e.preventDefault()
        UpdateUser({ userName: NewUserName, fullName: NewfullName, mobile: Newmobile, id,token }).then((res) => {
            console.log(res);
            dispatch(setUserDetails({
                id: res.user._id,
                userName: res.user.userName,
                fullName: res.user.fullName,
                mobile: res.user.mobile,
                email: res.user.email,
                image: res.user.image,
                token: token
            }))
            setIsEdit(false)
            isImgUpdate ? null : setSelectedFile(image ? image : baseImg)
            setProfileImg('')

        })
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setProfileImg(file);
        setSelectedFile(URL.createObjectURL(file));
    };

    const imageUpload = async() => {
        const response = await UpdateImage(profileImg,id,token)
        dispatch(setUserDetails({
            id: response.user._id,
            userName: response.user.userName,
            fullName: response.user.fullName,
            mobile: response.user.mobile,
            email: response.user.email,
            image: response.user.image,
            token: token
        }))
        setIsImgUpdate(true)
        setSelectedFile(response.user.image)
        console.log(response);
        setIsEdit(false)

    }
    return (
        <div className="contaier font-monospace">
            <div className="card col-md-8 col-12 mt-5 mx-auto profile-card">
                <div className="card-body h-100 ">
                    <h4 className='text-center '>{isEdit ? 'Edit' : 'My'} Profile</h4>
                    <hr />
                    <div className="co-12 row d-flex" >
                        <div className="col-3 text-center d-flex flex-column profile-image-area">
                            <img className='mx-auto' src={selectedFile !== (image || baseImg) ? selectedFile : (image ? `http://localhost:8080/users/${image}` : baseImg)}   alt="" />
                            {/* <img className='mx-auto' src={selectedFile!=baseImg ? selectedFile : (!image ? baseImg : `http://localhost:8080/users/${image}` )} alt="" /> */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={(e)=>handleFileChange(e)}
                            />
                            {isEdit ? (selectedFile !== image ?
                                <button data-aos="flip-left" className='btn mt-2 btn-outline-dark' onClick={imageUpload}>Update</button> :
                                <button data-aos="flip-left" className='btn mt-2 btn-outline-dark' onClick={handleButtonClick}>change picture</button>) : null}
                            {/* {isEdit ? (selectedFile !== image ?
                                <button data-aos="flip-left" className='btn mt-2 btn-outline-dark' onClick={imageUpload}>Update</button> :
                                <button data-aos="flip-left" className='btn mt-2 btn-outline-dark' onClick={handleButtonClick}>change picture</button>) : null} */}
                        </div>
                        {isEdit ?
                            <>
                                <div className="col-9" data-aos="fade-left">
                                    <form onSubmit={(e) => handleUpdate(e)}>
                                        <div className="mb-3">
                                            <label className="form-label">User Name</label>
                                            <input value={NewUserName} onChange={(e) => setUserName(e.target.value)} type="text" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Full Name </label>
                                            <input value={NewfullName} onChange={(e) => setfullName(e.target.value)} type="text" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Mobile</label>
                                            <input value={Newmobile} onChange={(e) => setmobile(e.target.value)} type="number" className="form-control" />
                                        </div>

                                        <button type='submit' className='btn btn-dark mt-3'>Save Changes</button>
                                    </form>

                                </div>
                            </>

                            : <div className="col-9 profile-details-h"  >
                                <h5 >Full Name : {fullName}</h5>
                                <h5 >User Name : {userName}</h5>
                                <h5 >Email : {email} </h5>
                                <h5 >Mobile : {mobile}</h5>
                                <button className='btn btn-dark mt-3' onClick={() => setIsEdit(true)}>Edit Details</button>

                            </div>}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
