import React, {FC} from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Rating, Typography} from "@mui/material";
import emptyImg from '../../../assets/emptyImg.png';

interface MovieProps {
    id: number;
    title: string;
    plot: string;
    horizontalPoster: string;
    rating: number;
    handleClick?: (args?: any) => void;
}

const Movie: FC<MovieProps> = (
    {
        id,
        title,
        plot,
        horizontalPoster,
        handleClick,
        rating
    }
) => {
    return (
        <Card sx={{
            backgroundImage: "none",
            backgroundColor: "#21295c",
            borderRadius: "0.55rem",
        }}>
            <CardActionArea onClick={handleClick?.bind(this, id)}>
                <CardMedia
                    component="img"
                    height="200"
                    image={horizontalPoster ? horizontalPoster : emptyImg }
                    alt="poster" />
                <CardContent>
                    <Typography sx={{ pb: "1rem" }} variant="h5" component="div" gutterBottom>
                        {title}
                    </Typography>
                    <Rating value={rating} readOnly />
                    <Typography
                        variant="body2"
                        textOverflow="ellipsis"
                        overflow="hidden"
                        whiteSpace="nowrap"
                    >
                        {plot}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default Movie;