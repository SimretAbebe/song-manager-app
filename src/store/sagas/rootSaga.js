import { all } from "redux-saga/effects";
import {
  watchFetchSongs,
  watchAddSong,
  watchUpdateSong,
  watchDeleteSong,
} from "./songsSaga"; 


export default function* rootSaga() {
  yield all([
    watchFetchSongs(),
    watchAddSong(), 
    watchUpdateSong(), 
    watchDeleteSong(), 
  ]);
}
