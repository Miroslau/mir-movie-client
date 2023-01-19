import React, { FC } from "react";
import { Box, Rating, Typography } from "@mui/material";
import { Container, Ratings } from "./rating-styled";

const customStyle = {
  justifyContent: "center",
  fontSize: "4rem",
};

interface RatingProps {
  title: string;
  name: string;
  value: number;
  changeRating: (args?: any) => void;
}
const CustomRating: FC<RatingProps> = ({
  title,
  name,
  changeRating,
  value,
}) => {
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number | null
  ): void => {
    changeRating(newValue);
  };

  return (
    <Container>
      <Typography>{title}</Typography>
      <Ratings>
        <Rating
          sx={customStyle}
          onChange={handleChange}
          name={name}
          value={value}
          size="large"
        />
      </Ratings>
    </Container>
  );
};

export default CustomRating;
