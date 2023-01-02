import { movieType } from "./moive-type";

type genreType = {
  id: number;
  genreName: string;
  movies: movieType[];
};

export default genreType;
