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

const MoviePage = () => {
    const [movie, setMovie] = useState<movieType | null>(null);
    const [genres, setGenres] = useState<genreType[] | []>([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isOpenModalForGenres, setOpenModalForGenres] = useState(false);

    const { id } = useParams();

    const navigate = useNavigate();

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
                <ImageBlock>
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
                                   className={buttonStyle}
                                   clickButton={setOpenModalForGenres.bind(this, true)}
                                   title="add genres" />
                        <ButtonMui variant="outlined" className={buttonStyle} clickButton={() => {}} title="edit movie" />
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
        </Container>
    );
};

export default MoviePage;