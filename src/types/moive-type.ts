import genreType from "./genre-type";
import directorType from "./director-type";
import actorType from "./actor-type";
import StatusEnum from "../enums/status-enum";
import {Moment} from "moment";

export type resultType<Pagination> = {
  results: Pagination[];
  total: number;
  page_total: number;
}

export type movieType = {
  id: number;
  title: string;
  posterUrl: string;
  horizontalPoster: string;
  release: Moment;
  rating: number;
  plot: string;
  movieLength: number;
  directors: directorType[];
  actors: actorType[];
  genres: genreType[];
};

export type createMovie = {
  title: string;
  plot: string;
  rating: number;
  release: Moment;
  movieLength: number;
}

export type movieParams = {
  limit: number;
  page: number;
};

export type movieSliceState = {
  movies: movieType[];
  status: StatusEnum;
  errorMessage: unknown;
  totalMovies: number;
  totalPages: number;
};
