import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  songs: [],
  isLoading: false,
  error: null,
  currentPage: 1, 
  songsPerPage: 5, 
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

    
    addSongRequested: (state) => {
      state.isLoading = true; 
      state.error = null;
    },
    addSongSuccess: (state, action) => {
      state.isLoading = false;
      state.songs.push(action.payload); 
      
    },
    addSongFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

   
    updateSongRequested: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateSongSuccess: (state, action) => {
      state.isLoading = false;
      const updatedSong = action.payload;
      const index = state.songs.findIndex((song) => song.id === updatedSong.id);
      if (index !== -1) {
        state.songs[index] = updatedSong; 
      }
    },
    updateSongFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

 
    deleteSongRequested: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteSongSuccess: (state, action) => {
      state.isLoading = false;
      const deletedSongId = action.payload;
      state.songs = state.songs.filter((song) => song.id !== deletedSongId); 
    },
    deleteSongFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload; 
    },
  },
});

export const {
  fetchSongsRequested,
  fetchSongsSuccess,
  fetchSongsFailed,
  addSongRequested,
  addSongSuccess,
  addSongFailed,
  updateSongRequested,
  updateSongSuccess,
  updateSongFailed,
  deleteSongRequested,
  deleteSongSuccess,
  deleteSongFailed,
  setCurrentPage,
} = songsSlice.actions;

export default songsSlice.reducer ;
