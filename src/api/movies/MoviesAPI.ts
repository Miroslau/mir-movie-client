import httpClient from "../index";
import {createMovie} from "../../types/moive-type";

export default {
  getAllMovies(limit: number, page: number) {
    const query = `/movies?limit=${limit}&page=${page}`;
    return httpClient.get(query);
  },

  getMovieById(id: number) {
      return httpClient.get(`movies/${id}`);
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
  },

  addGenres(id: number | undefined, genres: number[]) {
      return httpClient.post(`movies/addGenre/${id}`, {
          genresId: genres
      })
  }
};
