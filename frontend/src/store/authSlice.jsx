import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: localStorage.getItem("token") || null },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

export const loginUser = (username, password) => async (dispatch) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/login/", { username, password });
  
      if (res.data.access) {
        dispatch(loginSuccess({ user: res.data.user, token: res.data.access }));
      } else {
        throw new Error("Invalid login response");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };
  

export const registerUser = (username, password) => async () => {
  try {
    await axios.post("http://127.0.0.1:8000/auth/register/", { username, password });
    alert("User registered successfully!");
  } catch (error) {
    console.error("Registration failed", error);
  }
};
