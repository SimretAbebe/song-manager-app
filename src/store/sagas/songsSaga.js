import { call, put, takeLatest } from "redux-saga/effects"; 
import { 
  fetchSongsRequested, 
  fetchSongsSuccess, 
  fetchSongsFailed 
} from "../slices/songsSlice"; 
import songService from "../../services/songService"; 


// Worker Saga: Performs the actual API call to fetch songs
function* fetchSongsSaga() {
  try {
    const songs = yield call(songService.getSongs);
    yield put(fetchSongsSuccess(songs));
  } catch (error) {
    yield put(fetchSongsFailed(error.message));
  }
}

export function* watchFetchSongs() {
  yield takeLatest(fetchSongsRequested.type, fetchSongsSaga);
}


