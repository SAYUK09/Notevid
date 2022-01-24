import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { INotesData, ISliceState } from "../types";

export const getNotes = createAsyncThunk(
  "notes/getNotes",
  async (reqData: any, thunkApi) => {
    const { userId, videoId } = reqData;

    const {
      data: { data },
    } = await axios.get("/api/notes", {
      params: {
        userId,
        videoId,
      },
    });

    return data;
  }
);

const initialState: ISliceState = {
  notesArr: [],
  status: "idle",
};

export const notesSlice = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotes.fulfilled, (state, action) => {
      const notes = action.payload.map((item: INotesData) => item.notes);
      state.notesArr = notes;
    });
  },
});

export const {} = notesSlice.actions;

export default notesSlice.reducer;
