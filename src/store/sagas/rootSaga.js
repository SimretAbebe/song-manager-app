import { all } from "redux-saga/effects";
import { watchFetchSongs } from "./songsSaga"; 


export default function* rootSaga() {
  yield all([watchFetchSongs()]); 
}
