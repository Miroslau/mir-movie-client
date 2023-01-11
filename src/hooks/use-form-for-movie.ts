import React, {useCallback, useEffect, useState} from "react";
import moment, {isMoment} from "moment";
import {createMovie} from "../types/moive-type";

const useFormForMovie = (
    callback: any,
    validateErrors: any,
    callBackFunction: any) => {
    const [movie, setMovie] = useState<createMovie>({
        title: '',
        plot: '',
        rating: 0,
        release: moment(),
        movieLength: 1,
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (isMoment(event)) {
            setMovie(prevState => ({
                ...prevState,
                release: event,
            }))
        } else {
            const {name, value} = event.target;
            setMovie({...movie, [name]: value})
        }
    }, [movie]);

    const changeRating = useCallback((value: number) => {
        setMovie({...movie, rating: value})
    }, [movie])

    const handleClear = () => {
        setMovie({
            title: '',
            plot: '',
            rating: 0,
            release: moment(),
            movieLength: 1,
        });
        callBackFunction();
    };

    const handleSubmit = useCallback(() => {
        setErrors(validateErrors(movie));
        setIsSubmitting(true);
    }, [movie]);

    const clearError = () => {
        setErrors({});
    };

    useEffect(
        () => {
            if (Object.keys(errors).length === 0 && isSubmitting) {
                callback(movie);
            }
        },
        [errors],
    );

    return {
        handleChange, handleSubmit, movie, errors, clearError, handleClear, changeRating
    };
}

export default useFormForMovie;