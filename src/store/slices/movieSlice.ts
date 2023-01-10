import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { movieSliceState, movieType } from "../../types/moive-type";
import {addMovie, fetchMovies} from "../actions/fetch-movies";
import { RootState } from "../store";
import StatusEnum from "../../enums/status-enum";

const initialState: movieSliceState = {
  errorMessage: "",
  movies: [],
  status: StatusEnum.LOADING,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovie(state, { payload }) {
      state.movies.push({...payload})
    },
    clearState(state) {
      state.movies = [];
      state.errorMessage = "";
      state.status = StatusEnum.LOADING;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state, { payload }) => {
      state.status = StatusEnum.LOADING;
      state.movies = [];
    });

    builder.addCase(fetchMovies.fulfilled, (state, { payload }) => {
      state.movies = payload;
      state.status = StatusEnum.SUCCESS;
    });

    builder.addCase(fetchMovies.rejected, (state, { payload }) => {
      state.status = StatusEnum.ERROR;
      state.movies = [];
      state.errorMessage = payload;
    });
  },
});

export const { setMovie, clearState } = movieSlice.actions;

export const movieSelector = (state: RootState) => state.movie;
