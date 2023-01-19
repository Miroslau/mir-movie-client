import RouteType from "../types/routeType";
import {
  MAIN_PAGE,
  MOVIES,
  FULL_MOVIE,
  ACTORS,
  ACTOR,
} from "../constants/routes";
import MoviesPage from "../pages/movies-page/movies-page";
import MainPage from "../pages/main-page/main-page";
import React from "react";
import MoviePage from "../pages/movies-page/movie-page/movie-page";
import ActorsPage from "../pages/actors-page/actors-page";
import ActorPage from "../pages/actors-page/actor-page/actor-page";

const FullMovie = React.lazy(
  () => import("../pages/movies-page/movie-page/movie-page")
);

export const publicRoutes: RouteType[] = [
  {
    path: MAIN_PAGE,
    Component: MainPage,
  },
];

export const publicRoutesInLayout: RouteType[] = [
  {
    path: MOVIES,
    Component: MoviesPage,
  },
  {
    path: FULL_MOVIE,
    Component: MoviePage,
  },
  {
    path: ACTORS,
    Component: ActorsPage,
  },
  {
    path: ACTOR,
    Component: ActorPage,
  },
];
