import React, {useEffect, useState} from 'react';
import {Box, useMediaQuery} from "@mui/material";
import Header from "../../components/section-component/header/Header";
import {useAppDispatch} from "../../store/store";
import {useSelector} from "react-redux";
import {movieSelector} from "../../store/slices/movieSlice";
import {fetchMovies} from "../../store/actions/fetch-movies";
import StatusEnum from "../../enums/status-enum";
import Loader from "../../components/loader/loader";
import Modal from "../../components/modal/modal";
import Movie from "./movie/movie";

const MoviesPage = () => {
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const [movieOffset, setMovieOffset] = useState(0);
    const [moviesCount] = useState(10);

    const dispatch = useAppDispatch();

    const { movies, status } = useSelector(movieSelector);

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
    }, [])

    return (
        <Box p="1.5rem 2.5rem">
            {
                status === StatusEnum.LOADING && (
                    <Modal>
                        <Loader />
                    </Modal>
                )
            }
            <Header title="ALL MOVIES"
                    titleColor="#fff6e0"
                    subTitleColor="#ffe3a3"
                    subtitle="See your list of movies" />
            <Box pt="20px"
                 display="grid"
                 gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                 justifyContent="space-between"
                 rowGap="20px"
                 columnGap="1.33%"
                 sx={{
                    "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                    },
            }}>
                {
                    movies?.map(({id, title, plot, horizontalPoster, rating}) => (
                        <Movie key={id}
                               id={id}
                               title={title}
                               plot={plot}
                               horizontalPoster={horizontalPoster}
                               rating={rating} />
                    ))
                }
            </Box>
        </Box>
    );
};

export default MoviesPage;