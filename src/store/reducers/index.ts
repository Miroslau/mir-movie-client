import { combineReducers } from "@reduxjs/toolkit";
import movieReducer from "./movie-reducer";

const rootReducer = combineReducers({
  movie: movieReducer,
});

export default rootReducer;
