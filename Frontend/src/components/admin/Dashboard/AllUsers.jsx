import React, { useEffect, useState } from 'react'
import { GetAllUsers } from '../../../api/adminApi'

function AllUsers() {
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
                                            return(
                                                <tr>
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
                                                    <button type="button" data-bs-toggle="modal" data-bs-target="#{{_id}}" className="btn btn-dark">
                                                        Delete User
                                                    </button>
                                                    <a type="button" className="btn btn-outline-dark mx-2">
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
            </div>

        </>
    )
}

export default AllUsers
