import axios from "axios";
import { API_BASE_URL } from "../config/constants";

const adminAPI = axios.create({ baseURL: `${API_BASE_URL}/admin`,withCredentials: true,  })

export const AdminLogin = async (loginData) => {
    try {
        const response = await adminAPI.post('/login', loginData)
        return response.data
    } catch (error) {
        console.log(error);
    }
}


export const GetAllUsers = async () => {
    try {
        const response = await adminAPI.get('/allUsers')
        // console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const DeleteUser = async (id) => {
    try {
        const response = await adminAPI.delete(`/deleteuser/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}


export const GetOneUser = async (id) => {
    try {
        const response = await adminAPI.get(`/edituser/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const UpdateUser = async (data) => {
    try {
        // console.log(data);
        const response = await adminAPI.patch('/edituser', {data})
        return response.data
    } catch (error) {
        console.log(error);
    }
}


export const createUser = async(data) => {
    try {
        const response = await adminAPI.post('/adduser', data)
        return response.data
    } catch (error) {
        console.log(error);
    }
}


export const UsersSearch = async (key) => {
    try {
        const response = await adminAPI.get(`/search?key=${key}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}