import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga"; 
import songsReducer from "./slices/songsSlice";
import rootSaga from "./sagas/rootSaga"; 


const sagaMiddleware = createSagaMiddleware(); 

export const store = configureStore({
  reducer: {
    songs: songsReducer, 
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga); 


