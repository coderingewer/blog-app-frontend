import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import setAuthorizationToken from "../../auth/auth";

export const uploadImageAsync = createAsyncThunk("images/uploadImageAsync/", async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_REQUEST_DOMAIN}images/upload`, data);
    return res.data;

})

export const updateImageAsync = createAsyncThunk("images/updateImageAsync/", async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_REQUEST_DOMAIN}images/update/` + data.id, data.data);
    return res.data;
})
export const imageSlice = createSlice({
    name: "images",
    initialState: {
        items:[],
        isLoading: false,
        isUpdated:false,
        url: '',
        loadmessage:"",
        status: null,
    },
    reducers: {},
    extraReducers: {
        [uploadImageAsync.pending]: (state, action) => {
            state.isLoading = true;
        },

        [uploadImageAsync.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.url = action.payload.url
            state.status = true
            state.loadmessage = "Resim yüklendi"
        },
        [uploadImageAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.status = false
            state.loadmessage = "Resim yüklenirken hata oluştu"
        },
        [updateImageAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [updateImageAsync.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isUpdated = true;
            state.status = true
            state.loadmessage = "Resim yüklendi"
            state.items.push(action.payload)
        },
        [updateImageAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.status = false
            state.loadmessage = "Resim yüklenirken hata oluştu"
        },
    },
})

export const selectImage = (state) => state.images.items;
export const selectImages = (state) => state.images;
export const selectImageLoadMessage = (state) => state.images.loadmessage;
export const selectImageStatus = (state) => state.images.status;
export const imgSlc = (state) => state.images;
export default imageSlice.reducer;

