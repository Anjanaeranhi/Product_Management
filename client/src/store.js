import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Slice/User.slice";

export const store = configureStore({
    reducer: {
        "User" : userReducer
    }
})