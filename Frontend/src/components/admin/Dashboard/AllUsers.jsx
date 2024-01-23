import React, { useEffect, useState, useRef } from 'react'
import { DeleteUser, GetAllUsers } from '../../../api/adminApi'
import { useNavigate } from 'react-router-dom'


function AllUsers() {
    const navigate = useNavigate()
    const closeBTN = useRef(null)
    const [deleteUser,setDeleteUser] = useState('')
    const [users, setUsers] = useState([])

    useEffect(() => {
        try {
            const getUser = async () => {
                const responseData = await GetAllUsers()
                setUsers(responseData.users)
                // console.log(users);
            }
            getUser()
        } catch (error) {

        }
    }, [])

    useEffect(() => {
        console.log(users);
    }, [users])


    const handleDeleteUser = async () =>{
        console.log(deleteUser._id);
        const response = await DeleteUser(deleteUser._id)
        console.log(response);
        if(response.success){
            setUsers(response.users)
            closeBTN.current.click()
        }
    }

    return (
        <>

            <div className="container font-monospace">
                <div className="container-fluid pb-5">
                    <div className="card col-12 mt-5 ">
                        <div className="card-body h-100 ">
                            <div className="dash-header  ">
                                <div className="card ">
                                    <div className="card-body dash-box">
                                        <h1 className="fs-4  ">Users Details</h1>
                                        <button data-bs-toggle="modal" data-bs-target="#exampleModal" className="shadow btn btn-dark  ">
                                            + Add user
                                        </button>
                                    </div>
                                </div>

                                <div className="card ">
                                    <div className="card-body dash-box d-flex justify-content-start">
                                        <form className="d-flex col-12 " role="search" action="/admin/dashboard/search" method="get">
                                            <input className="form-control me-2" name="key" type="search" placeholder="Search" aria-label="Search" />
                                            <button className="btn btn-outline-dark col-2" type="submit"><i className="bi bi-search" /> Search</button>
                                        </form>
                                    </div>
                                </div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-center">User Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Mobile</th>
                                            <th scope="col" className="text-end ">
                                                Handle
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((item) => {
                                            return (
                                                <tr >
                                                    <th scope="row" className="text-center">
                                                        {item.userName}
                                                    </th>
                                                    <td>
                                                        {item.email}

                                                    </td>
                                                    <td>
                                                        {item.mobile}

                                                    </td>
                                                    <td className="text-end">
                                                        <button type="button" onClick={()=>setDeleteUser(item)} className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                            Delete User
                                                        </button>
                                                        <a type="button" onClick={()=>navigate(`/admin/edituser/${item._id}`)} className="btn btn-outline-dark mx-2">
                                                            Edit
                                                        </a>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


                {/* delete confirmation */}
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content ">
                            <div class="modal-header">
                                {/* <h1 class="modal-title fs-5" id="exampleModalLabel"></h1> */}
                                <button type="button"  class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                            ⚠️ Are you sure to delete <b className='bg-dark text-light px-2'> {deleteUser.userName}</b> User?
                            </div>
                            <div class="modal-footer">
                                <button type="button" ref={closeBTN} class="btn btn-outline-dark" data-bs-dismiss="modal">Not Now</button>
                                <button type="button" class="btn btn-dark" onClick={handleDeleteUser}>Delete Now</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default AllUsers
