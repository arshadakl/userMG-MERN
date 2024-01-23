import axios from 'axios';
import { API_BASE_URL } from '../config/constants';
import { useSelector } from 'react-redux';

const userAPI = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
});


const tokenTaken = ()=>{
    const {token} = useSelector((state)=>sta.userName==state.userNameer)
  }

// Your existing functions remain the same
export const UserSignup = async (signupData) => {
  try {
    const response = await userAPI.post('/signup', signupData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const UserLogin = async (loginData) => {
  try {
    const response = await userAPI.post('/login', loginData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateUser = async (updateData) => {
  try {
    // const token = tokenTaken()
    // updateData.token = token
    const response = await userAPI.patch('/updateuser', updateData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateImage = async (img, id,token) => {
  try {
    const formData = new FormData();
    formData.append('image', img);
    formData.append('id', id);
    formData.append('token', token);
    console.log(formData);
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
