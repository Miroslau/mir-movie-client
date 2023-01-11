import { createAsyncThunk } from "@reduxjs/toolkit";
import {movieType, movieParams, createMovie, resultType} from "../../types/moive-type";
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

export const addMovie = createAsyncThunk(
    "movie/addMovie",
    async (movie: createMovie, thunkAPI) => {
        try {
            const { title, plot, rating, release, movieLength }: createMovie = movie;

            const response = await moviesAPI.createMovie({title, plot, rating, release, movieLength});

            const {status, data} = response;

            if (status !== 200) {
                return thunkAPI.rejectWithValue(data);
            }

            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    })
