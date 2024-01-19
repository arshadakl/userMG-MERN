import axios from 'axios'
import { API_BASE_URL } from '../config/constants'


const userAPI = axios.create({baseURL: API_BASE_URL})

export const UserSignup = async(signupData)=>{
    try {
        const response = await userAPI.post('/signup',signupData)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const UserLogin = async(loginData)=>{
    try {
        const response = await userAPI.post('/login',loginData)
        return response.data
    } catch (error) {
        console.log(error);
    }
}