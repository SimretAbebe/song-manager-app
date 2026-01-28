import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [], 
  isLoading: false, 
  error: null, 
};


export const songsSlice = createSlice({
  name: "songs", 
  initialState, 
  reducers: {
    fetchSongsRequested: (state) => {
      state.isLoading = true; 
      state.error = null; 
    },
    // Reducer for when songs are successfully fetched from the API.
    fetchSongsSuccess: (state, action) => {
      state.isLoading = false; 
      state.songs = action.payload; 
    },
    // Reducer for when fetching songs from the API fails.
    fetchSongsFailed: (state, action) => {
      state.isLoading = false; 
      state.error = action.payload; 
      state.songs = []; 
    },
  },
});

// These are functions you will dispatch from your components or sagas.
export const { fetchSongsRequested, fetchSongsSuccess, fetchSongsFailed } = songsSlice.actions;
export default songsSlice.reducer;
