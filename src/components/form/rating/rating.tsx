import React, {FC} from 'react';
import {Box, Rating, Typography} from "@mui/material";
import {Container, Ratings} from "./rating-styled";

const customStyle = {
    justifyContent: 'center',
    fontSize: '4rem'
}

interface RatingProps {
    title: string;
    name: string;
    value: number;
}
const CustomRating: FC<RatingProps> = ({ title, name, value }) => {
    return <Container>
        <Typography>{title}</Typography>
        <Ratings>
            <Rating sx={customStyle} name={name} value={value} size="large" />
        </Ratings>
    </Container>
};

export default CustomRating;