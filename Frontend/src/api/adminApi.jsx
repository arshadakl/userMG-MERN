import axios from "axios";
import { API_BASE_URL } from "../config/constants";

const adminAPI = axios.create({ baseURL: `${API_BASE_URL}/admin` })

export const AdminLogin = async (loginData) => {
    try {
        const response = await adminAPI.post('/login', loginData)
        return response.data
    } catch (error) {
        console.log(error);
    }
}


export const GetAllUsers = async ()=>{
    try {
        const response = await adminAPI.get('/allUsers')
        // console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error);
    }
}