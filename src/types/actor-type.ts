import { movieType } from "./moive-type";

type actorType = {
  id: number;
  firstName: string;
  secondName: string;
  image: string;
  Birth: Date;
  Nationality: string;
  movies: movieType[];
};

export default actorType;
