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


export const UpdateUser = async(updateData)=>{
    try {
        const response = await userAPI.patch('/updateuser',updateData)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const UpdateImage = async (img,id) => {
    try {
      const formData = new FormData();
      formData.append('image', img);
      formData.append('id', id);
  
      const response = await userAPI.post('/updateimg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };