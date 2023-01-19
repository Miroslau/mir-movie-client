import httpClient from "../index";
export default {
  getAllGenres() {
    return httpClient.get(`/genres`);
  },
};
