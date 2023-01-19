import { combineReducers } from "@reduxjs/toolkit";
import movieReducer from "./movie-reducer";
import filterReducer from "./filter-reducer";
import actorReducer from "./actor-reducer";

const rootReducer = combineReducers({
  movie: movieReducer,
  actor: actorReducer,
  filters: filterReducer,
});

export default rootReducer;
