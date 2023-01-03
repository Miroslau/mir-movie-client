import React, { FC, useEffect, useState, useCallback } from "react";
import { Box, Paper, Typography } from "@mui/material";
import BoxTitle from "../../components/section-component/box-title/box-title";
import { useSelector } from "react-redux";
import {clearState, movieSelector} from "../../store/slices/movieSlice";
import { fetchMovies } from "../../store/actions/fetch-movies";
import { useAppDispatch } from "../../store/store";
import BoxList from "../../components/section-component/box-list/box-list";
import {Container, ContainerForMovies} from "./main-page-styled";
import { movieType } from "../../types/moive-type";
import Modal from "../../components/modal/modal";
import Loader from "../../components/loader/loader";
import {useNavigate} from "react-router-dom";

const MainPage: FC = () => {
  const [movieOffset, setMovieOffset] = useState(0);
  const [moviesCount, setMoviesCount] = useState(6);
  const [currentMovie, setCurrentMovie] = useState<movieType | null>(null);
  const [horizontalPoster, setHorizontalPoster] = useState<string | null>(null);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { movies, status, errorMessage } = useSelector(movieSelector);

  const getMovies = () => {
    dispatch(
      fetchMovies({
        limit: moviesCount,
        page: movieOffset,
      })
    );
  };

  useEffect(() => {
    getMovies();
  }, [movieOffset]);

  useEffect(() => {
    if (status === "completed") {
      setCurrentMovie(movies[0]);
      setHorizontalPoster(movies[0].horizontalPoster);
    }
  }, [movies]);

  const choseMovie = useCallback((movie: movieType) => {
    setCurrentMovie(movie);
    setHorizontalPoster(movie.horizontalPoster);
  }, [movies]);

  const navigateToMovies = () => {
    dispatch(clearState());
    navigate('/movies');
  }


  return (
    <Container image={horizontalPoster}>
      {status === "loading" && (
        <Modal>
          <Loader />
        </Modal>
      )}
      <BoxTitle
        title={currentMovie?.title}
        subTitle={currentMovie?.plot}
        padding="100px 88px"
      />
      <ContainerForMovies>
        <BoxList navigateClick={navigateToMovies} title="All movies" data={movies} handleClick={choseMovie} />
      </ContainerForMovies>
    </Container>
  );
};

export default MainPage;
