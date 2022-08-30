import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

export const getPostsAsync = createAsyncThunk("posts/getPostsAsync", async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_GATEWAY_URL}/api/posts`);
    return res.data;
})

export const addPostsAsync = createAsyncThunk("posts/addPostsAsync", async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_REQUEST_DOMAIN}posts/new`, data, {
        headers: {
            'Authorization': `token ${localStorage.getItem("token")}`
        }
    })
    console.log(data);
    return res.data;
})

export const updatePostsAsync = createAsyncThunk("posts/updatePostsAsync", async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_REQUEST_DOMAIN}posts/update/` + data.id, data, {
        headers: {
            'Authorization': `token ${localStorage.getItem("token")}`
        }
    })
    return res.data;
})

export const updatePostImgsAsync = createAsyncThunk("posts/updatePostImgsAsync", async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_REQUEST_DOMAIN}posts/uploadimg/` + data.id, data.data, {
        headers: {
            'Authorization': `token ${localStorage.getItem("token")}`
        }
    })
    return res.data;
})

export const getUserPostsAsync = createAsyncThunk("posts/getUserPostsAsync", async (data) => {
    const res = await axios.get(`${process.env.REACT_APP_REQUEST_DOMAIN}/posts/getByUserId/` + data.id)
    return res.data;
})

export const getPostAsync = createAsyncThunk("posts/getPostAsync", async (data) => {
    const res = await axios.get(`${process.env.REACT_APP_API_GATEWAY_URL}/api/posts/` + data.postId)
    return res.data;
})

export const deletePostsAsync = createAsyncThunk("posts/deletePostsAsync", async (id) => {
    const res = await axios.delete(`${process.env.REACT_APP_REQUEST_DOMAIN}posts/delete/` + id, {
        headers: {
            'Authorization': `token ${localStorage.getItem("token")}`
        }
    })
    return res.data;
})
export const viewPostAsync = createAsyncThunk("posts/viewPostAsync", async (id) => {
    const res = await axios.post(`${process.env.REACT_APP_REQUEST_DOMAIN}posts/view/` + id)
    return res.data;
})

export const postSlice = createSlice({
    name: "posts",
    initialState: {
        items: [],
        likes: [],
        current: [],
        filtered: [],
        userposts: [],
        currentId: 0,
        currentPostId: 0,
        currentPost: JSON.parse(localStorage.getItem("currentPost")) || {},
        posted: false,
        deleted: false,
        isLoading: false,
        load:{status: null,
            loadmessage: ""}
        

    },
    reducers: {
        searchPosts: (state, action) => {
            const filtered = state.items.filter((item) => {
                return item["title"].toString().toLowerCase()
                    .includes(action.payload.toString().toLowerCase())
            });
            if (filtered.length < 1) {
                state.notFound = true
                state.filtered = []
            }
            else {
                state.notFound = false
            }
            state.filtered = filtered
        },
    },
    extraReducers: {
        [getPostsAsync.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.notLoaded = false;
            state.isLoading = false;
            state.status = true
        },
        [getPostsAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getPostsAsync.rejected]: (state, action) => {
            state.notLoaded = true
            state.status = false
            state.loadmessage = "Gönderiler alınırken bir hata oluştu"
        },
        [getUserPostsAsync.fulfilled]: (state, action) => {
            state.userposts = action.payload;
            state.status = true
        },
        [getUserPostsAsync.pending]: (state, action) => {
            state.isLoading = true
        },
        [getUserPostsAsync.rejected]: (state, action) => {
            state.status = false
            state.loadmessage = "Gönderiler alınırken bir hata oluştu"
        },

        [addPostsAsync.fulfilled]: (state, action) => {
            state.items.push(action.payload);
            console.log(action.payload)
            state.posted = true;
            state.status = true;
            state.isLoading = false;
            state.currentPostId = (action.payload.ID)
            state.loadmessage = "Gönderi payaşıldı"
        },
        [addPostsAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [addPostsAsync.rejected]: (state, action) => {
            state.posted = false;
            state.status = false;
            state.isLoading = false;
            state.loadmessage = "Gönderi payaşılırken bir hata oluştu"
        },
        [getPostAsync.fulfilled]: (state, action) => {
            state.current = []
            state.load.status = true
            state.isLoading = false;
            state.current.push(action.payload)
            localStorage.setItem("currentPost", JSON.stringify(action.payload))
        },
        [getPostAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getPostAsync.rejected]: (state, action) => {
            state.status = false
            state.isLoading = false;
            state.loadmessage = "Gönderi alınırken bir hata oluştu"
        },
        [deletePostsAsync.fulfilled]: (state, action) => {
            state.deleted = true;
            state.status = true;
            state.loadmessage = "Gönderi Silindi"
        },
        [deletePostsAsync.pending]: (state, action) => {
            state.isLoading = true
        },

        [deletePostsAsync.rejected]: (state, action) => {
            state.deleted = false;
            state.status = false
            state.loadmessage = "Gönderi Silinirken bir hata oluştu"
        },
        [updatePostImgsAsync.fulfilled]: (state, action) => {
            state.posted = true;
            state.status = true
            state.loadmessage = "Gönderi Kapak Fotoğrafı Güncellendi"
        },
        [updatePostImgsAsync.pending]: (state, action) => {
            state.isLoading = true
        },
        [updatePostImgsAsync.rejected]: (state, action) => {
            state.posted = false;
            state.status = false
            state.loadmessage = "Gönderi Kapak Fotoğrafı Güncellenirken bir hata oluştu"
        },
        [updatePostsAsync.fulfilled]: (state, action) => {
            state.posted = true;
            state.loadmessage = "Gönderi Güncellendi"
        },
        [updatePostsAsync.pending]: (state, action) => {
            state.isLoading = true
        },
        [updatePostsAsync.rejected]: (state, action) => {
            state.posted = false;
            state.status = true 
            state.loadmessage = "Gönderi Güncellenirken bir hata oluştu"
        }
    }
})
export const { searchPosts } = postSlice.actions;
export const selectPost = (state) => state.posts.items;
export const selectPosts = (state) => state.posts;
export const selectPostsStatus = (state) => state.posts.load.status;
export const selectPostLoadMessage = (state) => state.posts.loadmessage;
export default postSlice.reducer;