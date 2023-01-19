import React, { useEffect, useMemo, useState } from "react";
import actorType from "../../../types/actor-type";
import { useNavigate, useParams } from "react-router-dom";
import {
  Actor,
  Container,
  ImageBlock,
  Image,
  MiddleItem,
  Item,
  FullName,
} from "./actor-page-styled";
import Modal from "../../../components/modal/modal";
import Loader from "../../../components/loader/loader";
import actorsAPI from "../../../api/actors/actorsAPI";
import { ACTORS } from "../../../constants/routes";

import emptyImg from "../../../assets/emptyImg.png";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

const ActorPage = () => {
  const [actor, setActor] = useState<null | actorType>(null);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const getMovieById = async () => {
    setLoading(true);

    try {
      const { data } = await actorsAPI.getActorById(Number(id));
      setActor(data);
      setLoading(false);
    } catch (error) {
      navigate(`/${ACTORS}`);
      setLoading(false);
    }
  };

  const getFullName = useMemo(() => {
    return `${actor?.firstName} ${actor?.secondName}`;
  }, [actor]);

  useEffect(() => {
    getMovieById();
  }, []);

  return (
    <Container>
      {isLoading && (
        <Modal>
          <Loader />
        </Modal>
      )}
      <Actor>
        <ImageBlock>
          <Image src={actor?.image ? actor?.image : emptyImg} />
          <MiddleItem>
            <AddPhotoAlternateOutlinedIcon fontSize="large" />
          </MiddleItem>
        </ImageBlock>
        <Item>
          <div className="full-name-block">
            <FullName>{getFullName}</FullName>
          </div>
        </Item>
      </Actor>
    </Container>
  );
};

export default ActorPage;
