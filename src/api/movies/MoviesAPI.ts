import httpClient from "../index";
import {createMovie} from "../../types/moive-type";

export default {
  getAllMovies(limit: number, page: number) {
    const query = `/movies?limit=${limit}&page=${page}`;
    return httpClient.get(query);
  },

  createMovie({title,
      plot,
      rating,
      release,
      movieLength
              }: createMovie) {
    return httpClient.post(`/movies`, {
      title, plot, rating, release, movieLength
    })
  }
};
