import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthUser, IRegisterUser } from "../types";
import axios from "axios";
import { toast } from "react-toastify";

interface AuthState {
  user: IAuthUser | null;
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: IRegisterUser) => {
    const {
      data: { data },
    } = await axios.post("/api/user", userData);

    const { name, email, uid, photo, _id } = data;
    return { name, email, uid, photo, _id };
  }
);

const getInitialState = (): AuthState => {
  if (typeof window !== "undefined") {
    const localUser = localStorage.getItem("auth");
    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      return { user: parsedUser };
    }
  }

  return { user: null };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("auth");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      const user = action.payload;
      localStorage.setItem("auth", JSON.stringify(user));
      state.user = user;

      // state.user?.uid.length && toast.success("Logged in successful");
    });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
