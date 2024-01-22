import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    email: "",
};

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("adminToken"); // Fix the key here
        if (serializedState === null) {
            return initialState;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return initialState;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("adminToken", serializedState); // Fix the key here
    } catch (error) {
        // Handle error if needed
    }
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdminDetails: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            saveState(state);
        },
        logOutAdmin: (state, action) => {
            state.id = "";
            state.email = "";
            localStorage.clear();
        }
    }
});

export const { setAdminDetails, logOutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
