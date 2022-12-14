import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginAsync = createAsyncThunk(
  "users/loginAsnyc/",
  async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_LOGIN_DOMAIN}`, data);
    return res.data;
  }
);

export const registerAsync = createAsyncThunk(
  "users/registerAsnyc/",
  async (data) => {
    console.log(data);
    const res = await axios.post(
      `${process.env.REACT_APP_REQUEST_DOMAIN}users/new`,
      data,
      {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  }
);

export const getUserAsync = createAsyncThunk(
  "users/getUserAsnyc/",
  async (id) => {
    const res = await axios.get(
      `${process.env.REACT_APP_REQUEST_DOMAIN}users/getById/` + id
    );
    return res.data;
  }
);

export const getUsersAsync = createAsyncThunk(
  "users/getUsersAsnyc/",
  async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_REQUEST_DOMAIN}users/getAll`,
      {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  }
);
export const getCurrentUserAsync = createAsyncThunk(
  "users/GetCurrentUserAsync/",
  async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_REQUEST_DOMAIN}users/getByToken/`,
      {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  }
);

export const editUserAsync = createAsyncThunk(
  "users/editUserAsnyc/",
  async (data) => {
    const res = await axios.post(
      `${process.env.REACT_APP_REQUEST_DOMAIN}users/update/` + data.id,
      data,
      {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  }
);

export const editUserPassword = createAsyncThunk(
  "users/editUserPasswordByAdmin/",
  async (data) => {
    console.log(data);
    const res = await axios.post(
      `${process.env.REACT_APP_REQUEST_DOMAIN}users/updatePassword/` + data.id,
      data,
      {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  }
);

export const editUserPasswordByAdmin = createAsyncThunk(
  "users/editUserPasswordByAdmin/",
  async (data) => {
    const res = await axios.post(
      `${process.env.REACT_APP_REQUEST_DOMAIN}users/updatePasswordByAdmin/` +
        data.id,
      data,
      {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  }
);

export const editUserAvatarAsync = createAsyncThunk(
  "users/editUserAvatarAsync/",
  async (data) => {
    const res = await axios.post(
      `${process.env.REACT_APP_REQUEST_DOMAIN}users/updateuserimage`,
      data,
      {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    current: [],
    CurrentUser: JSON.parse(localStorage.getItem("user_data")),
    isLoggined: false,
    isLoading: false,
    autharized: false,
    regiterError: null,
    isUpdated: false,
    isRegistered: false,
    isSignOut: false,
    loadmessage: "",
    status: null,
  },
  reducers: {
    signOut: (state) => {
      state.isSignOut = true;
      localStorage.removeItem("token");
      localStorage.removeItem("logined");
      localStorage.removeItem("user_data");
    },
    getById: (state, action) => {
      const filtered = state.items.filter((item) => {
        return item.ID === action.payload;
      });
      state.current.push(filtered);
    },
  },
  extraReducers: {
    [registerAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [registerAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isRegistered = true;
      state.status = true;
      state.loadmessage = "Kullan??c?? kaydedilirken bir hata olu??tu";
    },
    [registerAsync.rejected]: (state, action) => {
      state.items.push(action.payload);
      state.isLoading = false;
      state.status = false;
      state.loadmessage = "Kullan??c?? kaydedilirken bir hata olu??tu";
    },
    [loginAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loginAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.autharized = true;
      state.status = true;
      console.log(action.payload)
      if (action.payload.error) {
        state.status = false;
        localStorage.setItem("error", JSON.stringify(action.payload.error));
        state.loadmessage = action.payload.error;
      } else {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user_data", JSON.stringify(action.payload));
        state.isLoggined = true;
        state.loadmessage = "Giri?? yap??ld??";
        localStorage.removeItem("error");
      }
    },

    [loginAsync.rejected]: (state, action) => {
      state.isLoggined = false;
      state.isLoading = false;
      state.status = false;
      localStorage.setItem("error", JSON.stringify(action.payload.error));
      state.loadmessage = "Giri?? yap??l??rken bir hata olu??tu";
    },
    [editUserAsync.fulfilled]: (state, action) => {
      state.isUpdated = true;
      state.status = true;
      state.isLoading = false;
      localStorage.setItem("user_data", JSON.stringify(action.payload));
    },
    [editUserAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [editUserAsync.rejected]: (state, action) => {
      state.isUpdated = false;
      state.isLoading = false;
      state.status = false;
      state.loadmessage = "G??mcelleme yap??l??rken bir hata olu??tu";
    },

    [editUserPassword.fulfilled]: (state, action) => {
      state.isUpdated = true;
      state.status = true;
      state.isLoading = false;
      localStorage.setItem("user_data", JSON.stringify(action.payload));
    },
    [editUserPassword.pending]: (state, action) => {
      state.isLoading = true;
    },
    [editUserPassword.rejected]: (state, action) => {
      state.isUpdated = false;
      state.isLoading = false;
      state.status = false;
      state.loadmessage = "G??mcelleme yap??l??rken bir hata olu??tu";
    },

    [editUserPasswordByAdmin.fulfilled]: (state, action) => {
      state.isUpdated = true;
      state.status = true;
      state.isLoading = false;
      localStorage.setItem("user_data", JSON.stringify(action.payload));
    },
    [editUserPasswordByAdmin.pending]: (state, action) => {
      state.isLoading = true;
    },
    [editUserPasswordByAdmin.rejected]: (state, action) => {
      state.isUpdated = false;
      state.isLoading = false;
      state.status = false;
      state.loadmessage = "G??mcelleme yap??l??rken bir hata olu??tu";
    },

    [getUserAsync.fulfilled]: (state, action) => {
      state.current = [];
      state.current.push(action.payload);
      state.isLoading = false;
      state.loadmessage = "Kullan??c?? ba??ar??yla y??klendi";
      state.status = true;
    },
    [getUserAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getUserAsync.rejected]: (state, action) => {
      state.loadmessage = "Kullan??c?? y??klenirken bir hata olu??tu";
      state.isLoading = false;
      state.status = false;
    },
    [getCurrentUserAsync.fulfilled]: (state, action) => {
      state.current = [];
      localStorage.setItem("user_data", JSON.stringify(action.payload));
      state.isLoading = false;
      state.loadmessage = "Kullan??c?? ba??ar??yla y??klendi";
      state.status = false;
    },
    [getCurrentUserAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getCurrentUserAsync.rejected]: (state, action) => {
      state.loadmessage = "Kullan??c?? y??klenirken bir hata olu??tu";
      state.isLoading = false;
      state.status = false;
    },
    [getUsersAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = true;
      state.isLoading = false;
      state.loadmessage = "Kullan??c??lar ba??ar??yla y??klendi";
    },
    [getUsersAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getUsersAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.loadmessage = "Kullan??c??lar y??klenirken bir hata olu??tu";
    },
    [editUserAvatarAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = true;
      state.loadmessage = "Profil Foto??raf?? ba??ar??yla y??klendi";
    },
    [editUserAvatarAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [editUserAvatarAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = false;
      state.loadmessage = "Profil Foto??raf?? y??klenirken bir hata olu??tu";
    },
  },
});
export const { signOut, getById } = userSlice.actions;
export const selectUser = (state) => state.users.CurrentUser;
export const usersLoadMessage = (state) => state.users.loadmessage;
export const usersStatus = (state) => state.users.status;
export const selectUsers = (state) => state.users;
export default userSlice.reducer;
