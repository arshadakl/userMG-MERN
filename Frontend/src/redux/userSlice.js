// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  userName: "",
  fullName: "",
  email: "",
  image: "",
  mobile: "",
  token:""
};



const loadState = () => {
  try {
    const serializedState = localStorage.getItem("userState");
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("userState", serializedState);
  } catch {
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: loadState(),
  reducers: {
    setUserDetails: (state, action) => {
      state.id = action.payload.id;
      state.userName = action.payload.userName;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.mobile = action.payload.mobile;
      state.token = action.payload.token;

      saveState(state);
    },
    logoutDetails: (state, action) => {
      state.id = ""; 
      state.userName = "";
      state.fullName = "";
      state.email = "";
      state.image = "";
      state.mobile = "";
      state.token = "";
      localStorage.clear()
    //   saveState(initialState);
    },
  },
});

export const { setUserDetails, logoutDetails } = userSlice.actions;
export default userSlice.reducer;
