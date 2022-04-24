import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { INoteData, ISliceState } from "../types";

export const getVideoHistory = createAsyncThunk(
  "notes/getVideoHistory",
  async (reqData: any, thunkApi) => {
    const { userId } = reqData;
    console.log(userId, "uss");
    const {
      data: { data },
    } = await axios.get("/api/video-history", {
      params: {
        userId,
      },
    });

    return data;
  }
);

const initialState: any = {
  historyArr: [],
  status: "Idle",
};

export const notesSlice = createSlice({
  name: "history",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVideoHistory.fulfilled, (state, action) => {
      const notes = action.payload.map((item: any) => item.notes);
      console.log(action.payload, "payyyyy");
      state.historyArr = notes;
    });
  },
});

export const {} = notesSlice.actions;

export default notesSlice.reducer;
