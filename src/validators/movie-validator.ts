
interface Error {
    [key:string]: string;
}
export const movieValidator = (values: any): Error => {
    const errors: Error = {};

    if (!values.title.trim()) {
        errors.title = 'Title for movie is required'
    }

    if (!values.plot.trim()) {
        errors.plot = 'Plot for movie is required'
    }

    if (!values.release) {
        errors.release = 'Release for movie is required'
    }

    if (!values.movieLength) {
        errors.movieLength = 'Time for movie is required'
    }

    return errors;
}