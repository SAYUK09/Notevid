import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IVideoHistorySliceState } from "../types";

export const getVideoHistory = createAsyncThunk(
  "video/getVideoHistory",
  async (reqData: any, thunkApi) => {
    const { userId } = reqData;
    const {
      data: { data },
    } = await axios.get("/api/videohistory", {
      params: {
        userId,
      },
    });

    return data;
  }
);

export const addVideoToHistory = createAsyncThunk(
  "video/addVideoToHistory",
  async (reqData: any, thunkApi) => {
    const { userId, videoId } = reqData;

    const {
      data: { data },
    } = await axios.post("/api/videohistory", {
      userId: userId,
      videoId: videoId,
    });

    return data;
  }
);

const initialState: IVideoHistorySliceState = {
  videoHistoryArr: [],
  status: "Idle",
};

export const videoHistorySlice = createSlice({
  name: "videoHistory",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVideoHistory.fulfilled, (state, action) => {
      const vidHis = action.payload;
      state.videoHistoryArr = vidHis;
    });

    builder.addCase(addVideoToHistory.fulfilled, (state, action) => {
      const res = action.payload;
    });
  },
});

export const {} = videoHistorySlice.actions;

export default videoHistorySlice.reducer;
