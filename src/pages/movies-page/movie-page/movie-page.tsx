import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {MOVIES} from "../../../constants/routes";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import moviesAPI from "../../../api/movies/MoviesAPI";
import genresAPI from "../../../api/genres/genresAPI";
import {
    ActorsBlock, ActorTitle,
    Container, GenresBlock,
    ImageBlock,
    Item, MenuBlock,
    Movie,
    Plot, PlotBox, PlotTitle, Score, ScoreBox, ScoreTitle,
    Title,
    Image, MiddleItem, Text, FormContainer
} from "./movie-page-styled";
import {movieType} from "../../../types/moive-type";
import Modal from "../../../components/modal/modal";
import Loader from "../../../components/loader/loader";

import emptyImg from '../../../assets/emptyImg.png';
import ellipse from '../../../assets/ellipse.svg';

import {getTimeFromMins} from "../../../mixins/getTimeFromMins";
import GenreBox from "../../../components/section-component/genre-box/genre-box";
import ButtonMui from "../../../components/ui-components/button-mui/button-mui";
import ModalMui from "../../../components/ui-components/modal-mui/modal-mui";
import genreType from "../../../types/genre-type";
import SelectInput from "../../../components/form/select-input/select-input";
import UploadFile from "../../../components/form/upload-file/upload-file";
import Form from "../../../components/form/form";
import {movieForm} from "../../../constants/movie-form";
import useFormForMovie from "../../../hooks/use-form-for-movie";
import {movieValidator} from "../../../validators/movie-validator";

const buttonStyle = {
    maxWidth: '200px',
    padding: '23px 32px',
    color: '#000000',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '19px',
    background: '#F33F3F',
    borderRadius: '4px',
}

const DIALOG = {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
}

const FILE_NAMES = ['posterUrl', 'horizontalPoster'];

const MoviePage = () => {
    const [movie, setMovie] = useState<null | movieType>(null);
    const [posterUrl, setPosterUrl] = useState<FileList | null>(null);
    const [genres, setGenres] = useState<genreType[] | []>([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isOpenModalForGenres, setOpenModalForGenres] = useState(false);
    const [isOpenModalForPosters, setOpenModalForPosters] = useState(false);
    const [isOpenModalForEditMovie, setOpenModalForEditMovie] = useState(false);

    const { id } = useParams();

    const navigate = useNavigate();

    const { handleChange, handleSubmit, movieModel, errors, handleClear, changeRating } = useFormForMovie(
        () => {},
        movieValidator,
        setOpenModalForEditMovie,
        movie
    )

    const setPosters = (files: FileList) => setPosterUrl(files)
    const getMovieById = async () => {
        setLoading(true);
        try {
            const { data } = await moviesAPI.getMovieById(Number(id));
            setMovie(data);
            setLoading(false);
        } catch (error) {
            navigate(`/${MOVIES}`)
            setLoading(false);
        }
    };

    const addGenresForMovie = () => {
        setLoading(true);
        const genres = selectedGenres.map(({ id }) => id);
        moviesAPI.addGenres(movie?.id, genres)
            .then(() => {
                // @ts-ignore
                setMovie(prevState => ({
                    ...prevState,
                    genres: selectedGenres
                }));
                setLoading(false);
                setOpenModalForGenres(false);
            })
            .catch(() => {
                setLoading(false);
                setOpenModalForGenres(false);
            })
    }

    const addPostersForMovie = () => {
        if (!posterUrl) return;
        setLoading(true);

        const formData = new FormData();

        FILE_NAMES.forEach((_, index) => {
            formData.append(FILE_NAMES[index], posterUrl[index], FILE_NAMES[index]);
        })

        moviesAPI.uploadPostersForMovie(movie?.id, formData)
            .then(({data}) => {
                // @ts-ignore
                setMovie(prevState => ({
                    ...prevState,
                    posterUrl: data?.posterUrl,
                    horizontalPoster: data?.horizontalPoster,
                }));
                setLoading(false);
                setOpenModalForPosters(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
                setOpenModalForPosters(false);
            });
    }

    const selectGenres = (genres: any) => {
        setSelectedGenres(genres);
    }

    useEffect(() => {
        getMovieById();
    }, [])

    useEffect(() => {
        setLoading(true)
        genresAPI.getAllGenres()
            .then(({ data }) => {
                setGenres(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            })
    }, [])

    return (
        <Container>
            {
                isLoading && (
                    <Modal>
                        <Loader />
                    </Modal>
                )
            }
            <Movie>
                <ImageBlock onClick={setOpenModalForPosters.bind(this, true)}>
                    <Image src={movie?.posterUrl ? movie?.posterUrl : emptyImg} />
                    <MiddleItem>
                        <AddPhotoAlternateOutlinedIcon fontSize="large" />
                    </MiddleItem>
                </ImageBlock>
                <Item>
                    <div className="title-block">
                        <Title>{movie?.title}</Title>
                        <GenresBlock>
                            {
                                movie?.genres.length ? <GenreBox genres={movie?.genres} /> : <div style={
                                    {
                                        marginRight: 15
                                    }
                                }>Empty</div>
                            }
                            <img src={ellipse} alt="ellipse"/>
                            <div>{getTimeFromMins(Number(movie?.movieLength))}</div>
                        </GenresBlock>
                    </div>
                    <PlotBox>
                        <PlotTitle>Overview</PlotTitle>
                        <Plot>{movie?.plot}</Plot>
                    </PlotBox>
                    <MenuBlock>
                        <ScoreBox>
                            <ScoreTitle>Score</ScoreTitle>
                            <Score>{movie?.rating}</Score>
                        </ScoreBox>
                        <ButtonMui variant="outlined"
                                   sx={buttonStyle}
                                   clickButton={setOpenModalForGenres.bind(this, true)}
                                   title="add genres" />
                        <ButtonMui variant="outlined"
                                   sx={buttonStyle}
                                   clickButton={setOpenModalForEditMovie.bind(this, true)}
                                   title="edit movie" />
                    </MenuBlock>
                </Item>
            </Movie>

            <ActorsBlock>
                <ActorTitle>Cast</ActorTitle>
            </ActorsBlock>
            <ModalMui
                isOpen={isOpenModalForGenres}
                styles={DIALOG}
                title="Add genres for movie"
                onClose={setOpenModalForGenres.bind(this, false)}>
                <FormContainer>
                    <SelectInput
                        inputs={genres}
                        id="genreId"
                        labelId="demo-multiple-name-label"
                        selectInput={selectGenres}
                        multiple={true} />
                    <ButtonMui
                        variant="outlined"
                        color="secondary"
                        title="Add genres"
                        clickButton={addGenresForMovie} />
                </FormContainer>
            </ModalMui>
            <ModalMui
                isOpen={isOpenModalForPosters}
                styles={DIALOG}
                title="Add posters for movie"
                onClose={setOpenModalForPosters.bind(this, false)}>
                <FormContainer>
                    <UploadFile
                        files={posterUrl}
                        countFiles={2}
                        accept="image/*"
                        setFile={setPosters} />
                    <ButtonMui
                        variant="outlined"
                        color="secondary"
                        disabled={!posterUrl}
                        title="Add posters"
                        clickButton={addPostersForMovie} />
                </FormContainer>
            </ModalMui>
            <ModalMui isOpen={isOpenModalForEditMovie}
                      title="Edit movie"
                      styles={DIALOG}
                      onClose={setOpenModalForEditMovie.bind(this, false)}>
                <Form
                    inputs={movieForm}
                    model={movieModel}
                    errors={errors}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    changeRating={changeRating}
                    title="Edit"
                    handleClear={handleClear} />
            </ModalMui>
        </Container>
    );
};

export default MoviePage;