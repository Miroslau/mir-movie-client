import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { movieSliceState, movieType, Status } from "../../types/moive-type";
import { fetchMovies } from "../actions/fetch-movies";
import { RootState } from "../store";

const initialState: movieSliceState = {
  errorMessage: "",
  movies: [],
  status: Status.LOADING,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<movieType[]>) {
      state.movies = action.payload;
    },
    clearState(state) {
      state.movies = [];
      state.errorMessage = "";
      state.status = Status.LOADING;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state, { payload }) => {
      state.status = Status.LOADING;
      state.movies = [];
    });

    builder.addCase(fetchMovies.fulfilled, (state, { payload }) => {
      state.movies = payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchMovies.rejected, (state, { payload }) => {
      state.status = Status.ERROR;
      state.movies = [];
      state.errorMessage = payload;
    });
  },
});

export const { setMovies, clearState } = movieSlice.actions;

export const movieSelector = (state: RootState) => state.movie;
