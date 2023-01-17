import React, {useEffect, useState} from 'react';
import {Box, Pagination, useMediaQuery} from "@mui/material";
import Header from "../../components/section-component/header/Header";
import {useAppDispatch} from "../../store/store";
import {useSelector} from "react-redux";
import {clearState, movieSelector, setStatus} from "../../store/slices/movie-slice";
import {fetchMovies} from "../../store/actions/fetch-movies";
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
import {filterSelector, setCurrentPage} from "../../store/slices/filter-slice";
import statusEnum from "../../enums/status-enum";
import {useNavigate} from "react-router-dom";
import {FULL_MOVIE} from "../../constants/routes";

const DIALOG = {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
}


const LIMIT_ITEMS = 8;

const MoviesPage = () => {
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const [pageCount, setPageCount] = useState(0);
    const [isOpenModal, setOpenModal] = useState(false);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const { movies, totalPages, totalMovies, status } = useSelector(movieSelector);
    const { currentPage } = useSelector(filterSelector);

    const createMovie = () => {
        dispatch(setStatus(statusEnum.LOADING));
        moviesAPI.createMovie(movieModel)
            .then(() => {
                dispatch(setStatus(statusEnum.SUCCESS));
                closeModal();
            })
            .catch(error => {
                console.error(error);
                dispatch(setStatus(statusEnum.ERROR));
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
                page: currentPage,
            })
        );
    };

    const navigateDetailPage = (id: number) => {
        const path = FULL_MOVIE.replace('movies/:id', id.toString());
        navigate(path);
    }

    const onChangePage = (_: any, page: number): void => {
        dispatch(setCurrentPage(page))
    }

    const { handleChange, handleSubmit, movieModel, errors, handleClear, changeRating } = useFormForMovie(
        createMovie,
        movieValidator,
        setOpenModal,
    );

    useEffect(() => {
        getMovies();
        dispatch(clearState());
    }, [currentPage])

    useEffect(() => {
        setPageCount(Math.ceil(totalMovies / totalPages));
    }, [LIMIT_ITEMS, movies])

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
                               handleClick={navigateDetailPage}
                               horizontalPoster={horizontalPoster}
                               rating={rating} />
                    ))
                }
            </Box>
            <PaginationContainer>
                <Pagination
                    count={pageCount || 0}
                    variant="outlined"
                    onChange={onChangePage}
                    color="secondary"
                    size="large" />
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
                    model={movieModel}
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