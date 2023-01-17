import { movieType } from "./moive-type";
import StatusEnum from "../enums/status-enum";

type actorType = {
  id: number;
  firstName: string;
  secondName: string;
  image: string;
  Birth: Date;
  Nationality: string;
  movies: movieType[];
};

export type actorParams = {
  limit: number;
  page: number;
}

export type actorSliceState = {
  actors: actorType[];
  status: StatusEnum;
  errorMessage: unknown;
  totalActors: number;
  totalPages: number;
}

export default actorType;
