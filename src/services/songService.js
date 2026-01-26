import axios from "axios";


const API_BASE_URL = process.env.API_BASE_URL || "https://jsonplaceholder.typicode.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


const songService = {

  async getSongs() {
    try {
      const response = await api.get("/songs");
      // MirageJS returns data in a { songs: [...] } envelope, so we extract it.
      return response.data.songs; 
    } catch (error) {
      console.error("SongService: Failed to fetch songs:", error);
      // Standardize error message for UI consumption
      throw new Error(error.response?.data?.message || "Failed to retrieve songs.");
    }
  },


  async addSong(songData) {
    try {
      const response = await api.post("/songs", songData);
      return response.data; // MirageJS returns the created item directly
    } catch (error) {
      console.error("SongService: Failed to add song:", error);
      throw new Error(error.response?.data?.message || "Failed to add song.");
    }
  },

 
  async updateSong(id, songData) {
    try {
      const response = await api.put(`/songs/${id}`, songData);
      return response.data; // MirageJS returns the updated item directly
    } catch (error) {
      console.error(`SongService: Failed to update song with ID ${id}:`, error);
      throw new Error(error.response?.data?.message || `Failed to update song with ID ${id}.`);
    }
  },

 
  async deleteSong(id) {
    try {
      await api.delete(`/songs/${id}`);
      // A 204 No Content response is expected for successful deletion
    } catch (error) {
      console.error(`SongService: Failed to delete song with ID ${id}:`, error);
      throw new Error(error.response?.data?.message || `Failed to delete song with ID ${id}.`);
    }
  },
};

export default songService;