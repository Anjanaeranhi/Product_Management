import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "User",
    initialState : {
        userData : null
    },
    reducers: {
        createUser : (state, action) =>{
            state.userData = action.payload;
        }
    }
});

export const {createUser} = userSlice.actions
export const userReducer = userSlice.reducer;
