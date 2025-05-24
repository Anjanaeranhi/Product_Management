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
    },
    setUserFromStorage: (state, action) => {
      state.userData = action.payload;
    }
});

export const {createUser, setUserFromStorage } = userSlice.actions
export const userReducer = userSlice.reducer;
