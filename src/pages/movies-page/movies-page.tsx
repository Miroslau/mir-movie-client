import React, {useEffect, useState} from 'react';
import {Box, Pagination, useMediaQuery} from "@mui/material";
import Header from "../../components/section-component/header/Header";
import {useAppDispatch} from "../../store/store";
import {useSelector} from "react-redux";
import {clearState, movieSelector, setMovie} from "../../store/slices/movieSlice";
import {addMovie, fetchMovies} from "../../store/actions/fetch-movies";
import StatusEnum from "../../enums/status-enum";
import Loader from "../../components/loader/loader";
import Modal from "../../components/modal/modal";
import Movie from "./movie/movie";
import FlexBetween from "../../components/section-component/flex-between/flex-between";
import ButtonMui from "../../components/ui-components/button-mui/button-mui";
import {AddCircleOutlineOutlined} from "@mui/icons-material";
import ModalMui from "../../components/ui-components/modal-mui/modal-mui";
import Form from "../../components/form/form";
import {movieForm} from "../../constants/movie-form";
import useFormForMovie from "../../hooks/use-form-for-movie";
import {movieValidator} from "../../validators/movie-validator";
import {PaginationContainer} from "./movies-page-styled";
import moviesAPI from "../../api/movies/MoviesAPI";

const DIALOG = {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
}

const LIMIT_ITEMS = 10

const MoviesPage = () => {
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const [movieOffset, setMovieOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [isOpenModal, setOpenModal] = useState(false);

    const dispatch = useAppDispatch();

    const { movies, status } = useSelector(movieSelector);

    const createMovie = () => {
        moviesAPI.createMovie(movie)
            .then(({ data }) => {
                dispatch(setMovie(data));
                closeModal();
            })
            .catch(error => {
                console.error(error);
                closeModal();
            })
    }

    const closeModal = () => {
        setOpenModal(false);
        handleClear();
    }

    const getMovies = () => {
        dispatch(
            fetchMovies({
                limit: LIMIT_ITEMS,
                page: movieOffset,
            })
        );
    };

    const { handleChange, handleSubmit, movie, errors, handleClear, changeRating } = useFormForMovie(
        createMovie,
        movieValidator,
        setOpenModal,
    );

    useEffect(() => {
        console.log(123)
        getMovies();
        dispatch(clearState());
    }, [])

    useEffect(() => {
        setPageCount(Math.ceil(movies.length));
    }, [LIMIT_ITEMS, movieOffset, movies])

    return (
        <Box p="1.5rem 2.5rem">
            {
                status === StatusEnum.LOADING && (
                    <Modal>
                        <Loader />
                    </Modal>
                )
            }
            <FlexBetween>
                <Header title="ALL MOVIES"
                        titleColor="#fff6e0"
                        subTitleColor="#ffe3a3"
                        subtitle="See your list of movies" />
                <ButtonMui
                    title="Add movie"
                    variant="outlined"
                    color="secondary"
                    size="medium"
                    clickButton={setOpenModal}
                >
                    <AddCircleOutlineOutlined sx={{
                        marginLeft: 1
                    }} />
                </ButtonMui>
            </FlexBetween>
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
            <PaginationContainer>
                <Pagination count={pageCount} variant="outlined" color="secondary" size="large" />
            </PaginationContainer>
            <ModalMui
                isOpen={isOpenModal}
                title="Add a new movie"
                onClose={closeModal}
                styles={DIALOG}
            >
                <Form
                    inputs={movieForm}
                    title="Add movie"
                    model={movie}
                    errors={errors}
                    handleChange={handleChange}
                    changeRating={changeRating}
                    handleSubmit={handleSubmit}
                    handleClear={handleClear} />
            </ModalMui>
        </Box>
    );
};

export default MoviesPage;