interface Error {
    [key:string]: string;
}

const REGX_ONLY_LETTER = /^[a-zA-Z\s]*$/;
const REGEX_MIN_MAX_LETTERS_NAME = /^.{2,32}$/;

export const validateName = (value: string) => {
    if (!value.trim()) {
        return `The field is required`;
    } else if (!REGX_ONLY_LETTER.test(value.trim())) {
        return 'The field must be alphabets only';
    } else if (!REGEX_MIN_MAX_LETTERS_NAME.test(value)) {
        return `Must be of length 2 to 32`;
    }
}

export const userValidator = (values: any): Error => {
    const errors: Error = {};

    for (const key in values) {
        if (typeof values[key] === 'string') {

            const resultValidate = validateName(values[key]);

            if (resultValidate) {
                errors[key] = resultValidate;
            }
        }
    }

    if (!values.Birth) {
        errors.Birth = ' The birth is required';
    }

    return errors;
}