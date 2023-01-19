import React, { FC, useEffect } from "react";
import genreType from "../../../types/genre-type";
import { Container } from "./genre-box-styled";

interface GenreBoxProps {
  genres: genreType[];
}
const GenreBox: FC<GenreBoxProps> = ({ genres }) => {
  return (
    <Container>
      {genres.map(({ id, genreName }) => (
        <span key={id}>{genreName}</span>
      ))}
    </Container>
  );
};

export default GenreBox;
