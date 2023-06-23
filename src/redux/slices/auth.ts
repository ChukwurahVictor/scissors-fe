import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { RootState } from "../store";
import urls from "services/axios/urls";
import { AuthState } from "types";

export interface RegisterUserPayloadType {
  userName: string;
  email: string;
  password: string;
}

export interface SigninPayloadType {
  email: string;
  password: string;
}

const initialState: AuthState = {
  status: "idle",
  data: {
    access_token: "",
    user: {
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      displayName: "",
    },
  },
  httpError: null,
  isLoggedIn: false,
};

export const registerUserService = async (data: RegisterUserPayloadType) =>
  axios.post("/api/register", data);

export const signinService = async (data: SigninPayloadType) =>
  axios.post("", data);

export const registerUserAsync = createAsyncThunk(
  "auth/register",
  async (payload: RegisterUserPayloadType, thunkAPI) => {
    try {
      const response = await registerUserService(payload);
      return response.data;
    } catch (err: any) {
      let error: AxiosError = err;
      if (!error.response) throw err;
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signinAsync = createAsyncThunk(
  urls.loginUrl,
  async (payload: SigninPayloadType, thunkAPI) => {
    try {
      const response = await signinService(payload);
      return response.data;
    } catch (err: any) {
      let error: AxiosError = err;
      if (!error.response) throw err;
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    loginDispatch: (state, { payload }) => {
      state.isLoggedIn = true;
      state.data = payload;
    },
    logoutDispatch: state => {
      state.isLoggedIn = false;
      state.data = {
        access_token: "",
        user: {
          id: "",
          email: "",
          firstName: "",
          lastName: "",
          displayName: "",
        },
      }
    },
},
  extraReducers: builder => {
    builder
      .addCase(signinAsync.pending, state => {
        state.status = "loading";
      })
      .addCase(signinAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(signinAsync.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.httpError = action.payload;
          return;
        }
        state.httpError = action.error;
      })

      .addCase(registerUserAsync.pending, state => {
        state.status = "loading";
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.httpError = action.payload;
          return;
        }
        state.httpError = action.error;
      });
  },
});

export const { loginDispatch, logoutDispatch, reset } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
