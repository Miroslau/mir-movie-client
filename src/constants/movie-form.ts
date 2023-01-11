import Input from "../interfaces/input.interface";

export const movieForm: Input[] = [
    {
        id: 1,
        title: 'Title of movie',
        model: 'title',
        required: true,
        placeholder: 'Enter a title for movie',
        type: 'text',
        variant: 'outlined'
    },
    {
        id: 2,
        title: 'Plot of movie',
        model: 'plot',
        required: true,
        placeholder: 'Enter a plot for movie',
        type: 'textarea',
        variant: 'outlined'
    },
    {
        id: 3,
        title: 'Release for movie',
        model: 'release',
        type: 'date-picker'
    },
    {
        id: 4,
        title: 'Time length for movie',
        model: 'movieLength',
        type: 'number',
        variant: 'outlined',
        required: true,
        placeholder: 'Enter a time length for movie',
    },
    {
        id: 5,
        title: 'Rating for movie',
        model: 'rating',
        required: false,
        type: 'rating'
    }
]