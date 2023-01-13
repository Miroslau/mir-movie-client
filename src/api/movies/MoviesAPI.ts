import httpClient from "../index";
import {createMovie, movieType} from "../../types/moive-type";

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
  },

  uploadPostersForMovie(id: number | undefined, formData: FormData) {
      return httpClient.post(`movies/${id}/upload-posters`, formData);
  },

  updateMovie(id: number | undefined, body: movieType | createMovie) {
    return httpClient.put(`movies/${id}`, body);
  },

  deleteMovie(id: number | undefined) {
      return httpClient.delete(`movies/${id}`)
  }
};
