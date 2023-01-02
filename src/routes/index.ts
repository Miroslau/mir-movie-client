import RouteType from "../types/routeType";
import { MOVIES } from "../constants/routes";
import MoviesPage from "../pages/movies-page/movies-page";

export const publicRoutes: RouteType[] = [
  {
    path: MOVIES,
    Component: MoviesPage,
  },
];
