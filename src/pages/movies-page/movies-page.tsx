import React, { FC, useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import test from "../../assets/test.png";
import BoxTitle from "../../components/section-component/box-title/box-title";
import { useSelector } from "react-redux";
import { movieSelector } from "../../store/slices/movieSlice";
import { fetchMovies } from "../../store/actions/fetch-movies";
import { useAppDispatch } from "../../store/store";
import BoxList from "../../components/section-component/box-list/box-list";
import { Container, ContainerForMovies } from "./movies-page-styled";
import { movieType } from "../../types/moive-type";
import Modal from "../../components/modal/modal";
import Loader from "../../components/loader/loader";

const MoviesPage: FC = () => {
  const [movieOffset, setMovieOffset] = useState(0);
  const [moviesCount, setMoviesCount] = useState(6);
  const [currentMovie, setCurrentMovie] = useState<movieType | null>(null);
  const [horizontalPoster, setHorizontalPoster] = useState<string | null>(null);

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

  const choseMovie = (movie: movieType) => {
    setCurrentMovie(movie);
    setHorizontalPoster(movie.horizontalPoster);
  };

  const styles = {
    title: {
      fontFamily: "Oswald",
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "20px",
      lineHeight: "30px",
      color: "white",
    },
  };

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
      <Typography p="0 88px" style={styles.title}>
        All movies
      </Typography>
      <ContainerForMovies>
        <BoxList data={movies} handleClick={choseMovie} />
      </ContainerForMovies>
    </Container>
  );
};

export default MoviesPage;
