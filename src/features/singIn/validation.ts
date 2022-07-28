const REQUIRED_FIELD = 'Field is required'

export const emailValidation = {
    required: REQUIRED_FIELD,
    validate: (values: string) => {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values)) {
            return 'Invalid email address';
        }
        return true;
    }
};

export const passwordValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if (value.length <= 2) {
            return 'The password must contain more than two symbols';
        }
        return true;
    }
};