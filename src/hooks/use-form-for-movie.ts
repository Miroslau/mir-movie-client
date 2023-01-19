import React, { useCallback, useEffect, useState } from "react";
import moment, { isMoment } from "moment";
import { createMovie, movieType } from "../types/moive-type";

const useFormForMovie = (
  callback: any,
  validateErrors: any,
  callBackFunction: any,
  movie?: movieType | createMovie | null
) => {
  const [movieModel, setMovieModel] = useState<createMovie>({
    title: "",
    plot: "",
    rating: 0,
    release: moment(),
    movieLength: 1,
  });

  useEffect(() => {
    if (movie) {
      const movieDTO = {
        title: movie?.title,
        release: movie?.release,
        rating: movie?.rating,
        plot: movie?.plot,
        movieLength: movie?.movieLength,
      };
      setMovieModel(movieDTO);
    }
  }, [movie]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isMoment(event)) {
        setMovieModel((prevState) => ({
          ...prevState,
          release: event,
        }));
      } else {
        const { name, value } = event.target;
        setMovieModel({ ...movieModel, [name]: value });
      }
    },
    [movieModel]
  );

  const changeRating = useCallback(
    (value: number) => {
      setMovieModel({ ...movieModel, rating: value });
    },
    [movieModel]
  );

  const handleClear = () => {
    setMovieModel({
      title: "",
      plot: "",
      rating: 0,
      release: moment(),
      movieLength: 1,
    });
    callBackFunction();
  };

  const handleSubmit = useCallback(() => {
    setErrors(validateErrors(movieModel));
    setIsSubmitting(true);
  }, [movieModel]);

  const clearError = () => {
    setErrors({});
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(movieModel);
    }
  }, [errors]);

  return {
    handleChange,
    handleSubmit,
    movieModel,
    errors,
    clearError,
    handleClear,
    changeRating,
  };
};

export default useFormForMovie;
