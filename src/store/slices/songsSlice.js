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
    
    fetchSongsSuccess: (state, action) => {
      state.isLoading = false; 
      state.songs = action.payload; 
    },
    
    fetchSongsFailed: (state, action) => {
      state.isLoading = false; 
      state.error = action.payload; 
      state.songs = []; 
    },
   
  },
});


export const { fetchSongsRequested, fetchSongsSuccess, fetchSongsFailed } = songsSlice.actions;


export default songsSlice.reducer;
