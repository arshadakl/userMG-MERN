import React from 'react'

function EditProfile() {
  return (
    <div className="container font-monospace">
            <div className="card col-8 mt-5 mx-auto profile-card">
                <div className="card-body h-100 ">
                    <h4 className='text-center '>My Profile</h4>
                    <hr />
                    <div className="co-12 row   d-flex">
                        <div className="col-3 d-flex flex-column text-center profile-image-area">
                            <img src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg" alt="" />
                            
                        </div>
                        <div className="col-9">
                            <h5>Name : </h5>
                            <h5>Email : </h5>
                            <h5>Mobile : </h5>
                            <button className='btn btn-dark'>Edit Details</button>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default EditProfile
