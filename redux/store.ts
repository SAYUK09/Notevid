import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./notesSlice";
import videoHistorySlice from "./videoHistorySlice";

export const store = configureStore({
  reducer: { notes: notesSlice, videoHistory: videoHistorySlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
