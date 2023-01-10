import React, {useCallback, useEffect, useState} from "react";

const useFormForMovie = (
    callback: any,
    validateErrors: any,
    callBackFunction: any) => {
    const [movie, setMovie] = useState({
        title: '',
        plot: '',
        rating: 0,
        release: new Date(),
        movieLength: 1,
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setMovie({...movie, [name]: value})
    }, [movie]);

    const handleClear = () => {
        setMovie({
            title: '',
            plot: '',
            rating: 0,
            release: new Date(),
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
        handleChange, handleSubmit, movie, errors, clearError, handleClear,
    };
}

export default useFormForMovie;