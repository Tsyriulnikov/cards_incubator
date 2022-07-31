const REQUIRED_FIELD = 'Field is required';

export const emailValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if (!/^[\w][\w-.]*@[\w-]+\.[a-z]{2,7}$/i.test(value)) {
            return 'Invalid email address';
        }
        return true;
    }
};

export const passwordValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if (value.length <= 6) {
            return 'Password must be more than 7 characters...';
        }
        return true;
    }
};
