import Input from "../interfaces/input.interface";


export const actorForm: Input[] = [
    {
        id: 1,
        title: 'First name',
        model: 'firstName',
        required: true,
        placeholder: 'Enter a first name for actor',
        type: 'text',
        variant: 'outlined'
    },
    {
        id: 2,
        title: 'Second name',
        model: 'secondName',
        required: true,
        placeholder: 'Enter a second name for actor',
        type: 'text',
        variant: 'outlined'
    },
    {
        id: 3,
        title: 'Birth',
        model: 'Birth',
        type: 'date-picker'
    },
    {
        id: 4,
        title: 'Nationality',
        model: 'Nationality',
        required: true,
        placeholder: 'Enter the nationality for actor',
        type: 'text',
        variant: 'outlined'
    }
]