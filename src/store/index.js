import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "./slices/songsSlice"; 


export const store = configureStore({
  reducer: {
    songs: songsReducer, 
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

