import genreType from "./genre-type";
import directorType from "./director-type";
import actorType from "./actor-type";

export type movieType = {
  id: number;
  title: string;
  posterUrl: string;
  horizontalPoster: string;
  release: Date;
  rating: number;
  plot: string;
  movieLength: number;
  directors: directorType[];
  actors: actorType[];
  genres: genreType[];
};

export type movieParams = {
  limit: number;
  page: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "completed",
  ERROR = "error",
}

export type movieSliceState = {
  movies: movieType[];
  status: Status;
  errorMessage: unknown;
};
