import RouteType from "../types/routeType";
import {MAIN_PAGE, MOVIES} from "../constants/routes";
import MoviesPage from "../pages/movies-page/movies-page";
import MainPage from "../pages/main-page/main-page";

export const publicRoutes: RouteType[] = [
    {
        path: MAIN_PAGE,
        Component: MainPage,
    }
]

export const publicRoutesInLayout: RouteType[] = [
  {
    path: MOVIES,
    Component: MoviesPage,
  },
];
