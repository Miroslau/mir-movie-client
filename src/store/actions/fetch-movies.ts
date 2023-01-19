import { createAsyncThunk } from "@reduxjs/toolkit";
import { movieType, movieParams, resultType } from "../../types/moive-type";
import moviesAPI from "../../api/movies/MoviesAPI";

export const fetchMovies = createAsyncThunk<resultType<movieType>, movieParams>(
  "movie/fetchMovies",
  async (params, thunkAPI) => {
    try {
      const { limit, page } = params;

      const { status, data } = await moviesAPI.getAllMovies(limit, page);

      if (status !== 200) {
        return thunkAPI.rejectWithValue(data);
      }

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
