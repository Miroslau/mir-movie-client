import httpClient from "../index";

export default {
  getAllMovies(limit: number, page: number) {
    const query = `/movies?count=${limit}&offset=${page}`;
    return httpClient.get(query);
  },
};
