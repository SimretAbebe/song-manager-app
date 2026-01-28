import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import songService from "../../services/songService"; 



// 1. Define the initial state for the songs slice.
const initialState = {
  songs: [], 
  isLoading: false, 
  error: null,
};


export const fetchSongs = createAsyncThunk(
  'songs/fetchSongs', 
  async (_, { rejectWithValue }) => {
    try {
      const songs = await songService.getSongs(); 
      return songs;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch songs');
    }
  }
);

// 3. Create the songs slice using createSlice.
export const songsSlice = createSlice({
  name: "songs", 
  initialState, 
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.isLoading = true; 
        state.error = null; 
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.isLoading = false; 
        state.songs = action.payload; 
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.isLoading = false; 
        state.error = action.payload; 
        state.songs = []; 
      });
  },
});

// 5. Export the reducer function.
export default songsSlice.reducer;
