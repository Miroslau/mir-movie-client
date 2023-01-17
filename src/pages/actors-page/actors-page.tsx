import React, {useEffect, useMemo, useState} from 'react';
import {Box, Card, CardActionArea, CardContent, CardMedia, Pagination, Typography, useMediaQuery} from "@mui/material";
import FlexBetween from "../../components/section-component/flex-between/flex-between";
import Header from "../../components/section-component/header/Header";
import {AddCircleOutlineOutlined} from "@mui/icons-material";
import ButtonMui from "../../components/ui-components/button-mui/button-mui";
import {useAppDispatch} from "../../store/store";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {actorSelector, clearState} from "../../store/slices/actor-slice";
import {filterSelector, setCurrentPage} from "../../store/slices/filter-slice";
import {fetchActors} from "../../store/actions/fetch-actors";
import StatusEnum from "../../enums/status-enum";
import Modal from "../../components/modal/modal";
import Loader from "../../components/loader/loader";
import emptyImg from '../../assets/emptyImg.png';
import {PaginationContainer} from "../movies-page/movies-page-styled";
import ModalMui from "../../components/ui-components/modal-mui/modal-mui";

const LIMIT_ITEMS = 8;

const DIALOG = {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
}

const ActorsPage = () => {
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const [pageCount, setPageCount] = useState(0);
    const [isOpenModal, setOpenModal] = useState(false);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const { actors, totalPages, totalActors, status } = useSelector(actorSelector);
    const { currentPage } = useSelector(filterSelector);

    const closeModal = () => {
        setOpenModal(false);
    }

    const getActors = () => dispatch(fetchActors({limit: LIMIT_ITEMS, page: currentPage}));

    const onChangePage = (_: any, page: number): void => {
        dispatch(setCurrentPage(page))
    }

    useEffect(() => {
        getActors();
        dispatch(clearState())
    }, [currentPage]);

    useEffect(() => {
        setPageCount(Math.ceil(totalActors / totalPages));
    }, [LIMIT_ITEMS, actors]);

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
                <Header title="ALL ACTORS"
                        titleColor="#fff6e0"
                        subTitleColor="#ffe3a3"
                        subtitle="See your list of actors" />
                <ButtonMui
                    title="Add actor"
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
                 gridTemplateColumns="repeat(3, 270px)"
                 rowGap="10px"
                 columnGap="20px"
                 sx={{
                     "& > div": {
                         gridColumn: isNonMobile ? undefined : "span 4",
                     }
                 }}
            >
                {
                    actors?.map(({ id, firstName, secondName, image }) => (
                        <Card key={id}
                              sx={{
                                  backgroundImage: "none",
                                  backgroundColor: "#21295c",
                                  borderRadius: "0.55rem",
                                  maxWidth: '270px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                              }}
                        >
                            <CardActionArea>
                                <CardMedia component="img"
                                           image={image ? image : emptyImg}
                                           alt="actor"
                                           height="auto" />
                                <CardContent>
                                    <Typography sx={{ pb: "1rem" }} variant="h5" component="div" gutterBottom>
                                        {
                                            firstName + ' ' + secondName
                                        }
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))
                }
            </Box>
            <PaginationContainer>
                <Pagination count={pageCount || 0}
                            variant="outlined"
                            color="secondary"
                            onChange={onChangePage}
                            size="large" />
            </PaginationContainer>
            <ModalMui isOpen={isOpenModal}
                      title="Add a new actor"
                      styles={DIALOG}
                      onClose={closeModal}>
                <div>123</div>
            </ModalMui>
        </Box>
    );
};

export default ActorsPage;