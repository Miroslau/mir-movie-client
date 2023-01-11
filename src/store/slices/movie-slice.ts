import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { movieSliceState, movieType } from "../../types/moive-type";
import {addMovie, fetchMovies} from "../actions/fetch-movies";
import { RootState } from "../store";
import StatusEnum from "../../enums/status-enum";

const initialState: movieSliceState = {
  errorMessage: "",
  movies: [],
  totalMovies: 0,
  totalPages: 0,
  status: StatusEnum.LOADING,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovie(state, { payload }) {
      state.movies.push({...payload})
    },
    setStatus(state, { payload }) {
      state.status = payload;
    },
    clearState(state) {
      state.movies = [];
      state.totalMovies = 0;
      state.totalPages = 0;
      state.errorMessage = "";
      state.status = StatusEnum.LOADING;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state, { payload }) => {
      state.status = StatusEnum.LOADING;
      state.movies = [];
      state.totalMovies = 0;
      state.totalPages = 0;
    });

    builder.addCase(fetchMovies.fulfilled, (state, { payload }) => {
      state.movies = payload?.results;
      state.totalMovies = payload?.total;
      state.totalPages = payload?.page_total;
      state.status = StatusEnum.SUCCESS;
    });

    builder.addCase(fetchMovies.rejected, (state, { payload }) => {
      state.status = StatusEnum.ERROR;
      state.movies = [];
      state.totalMovies = 0;
      state.totalPages = 0;
      state.errorMessage = payload;
    });
  },
});

export const { setMovie, clearState, setStatus } = movieSlice.actions;

export const movieSelector = (state: RootState) => state.movie;
