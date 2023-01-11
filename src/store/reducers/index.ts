import { combineReducers } from "@reduxjs/toolkit";
import movieReducer from "./movie-reducer";
import filterReducer from "./filter-reducer";

const rootReducer = combineReducers({
  movie: movieReducer,
  filters: filterReducer,
});

export default rootReducer;
