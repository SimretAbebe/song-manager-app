import { all, call, put, takeLatest, takeEvery } from "redux-saga/effects"; 
import {
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
} from "../slices/songsSlice"; 
import songService from "../../services/songService"; 


function* fetchSongsSaga() {
  try {
    const songs = yield call(songService.getSongs);
    yield put(fetchSongsSuccess(songs));
  } catch (error) {
    console.error("Saga: Error fetching songs:", error.message);
    yield put(fetchSongsFailed(error.message));
  }
}


function* addSongSaga(action) {
  try {
   
    const newSong = yield call(songService.addSong, action.payload);
    yield put(addSongSuccess(newSong));
  } catch (error) {
    console.error("Saga: Error adding song:", error.message);
    yield put(addSongFailed(error.message));
  }
}


function* updateSongSaga(action) {
  try {
    const { id, ...songData } = action.payload; 
    const updatedSong = yield call(songService.updateSong, id, songData);
    yield put(updateSongSuccess(updatedSong));
  } catch (error) {
    console.error(`Saga: Error updating song ${action.payload?.id}:`, error.message);
    yield put(updateSongFailed(error.message));
  }
}


function* deleteSongSaga(action) {
  try {
    const songId = action.payload; 
    yield call(songService.deleteSong, songId);
    yield put(deleteSongSuccess(songId)); 
  } catch (error) {
    console.error(`Saga: Error deleting song ${action.payload}:`, error.message);
    yield put(deleteSongFailed(error.message));
  }
}


export function* watchFetchSongs() {
  yield takeLatest(fetchSongsRequested.type, fetchSongsSaga);
}


export function* watchAddSong() {
  yield takeEvery(addSongRequested.type, addSongSaga);
}


export function* watchUpdateSong() {
  yield takeLatest(updateSongRequested.type, updateSongSaga);
}

export function* watchDeleteSong() {
  yield takeLatest(deleteSongRequested.type, deleteSongSaga);
}
