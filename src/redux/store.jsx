import { configureStore } from "@reduxjs/toolkit";
import { imageSlice } from "./Image/imageSlice";
import { postSlice } from "./post/postSlice";
import userSlice from "./user/userSlice";

 export const store = configureStore({
    reducer: {
        posts: postSlice.reducer,
        users: userSlice,
        images: imageSlice.reducer,
    },
    
 })