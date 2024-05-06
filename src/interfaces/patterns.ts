const validationPatterns =  {
    CHARACTERS_ONLY : {
        pattern: /^[A-Za-z\s]+$/,
        message: (field:string):string => `${field} must be only characters.`
    },
    PASSWORD_PATTERN : {
        pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/,
        message: 'Password must contain at least one uppercase letter, one number and one special character'
    },
    CHARACTER_NUMBERS_PATTERN : {
        pattern:  /^[A-Za-z0-9\s]+$/,
        message: (field:string):string => `${field} must be only characters and numbers.`
    },
    OBJECTID_PATTERN : {
        pattern: /^[0-9a-fA-F]{24}$/,
        message: 'Invalid ObjectId'
    },
    EGYPTIAN_PHONE_NO_PATTERN: {
        pattern: /^01[0125][0-9]{8}$/,
        message: 'Invalid phone number, please enter a valid Egyptain phone number'
    }
}

export default validationPatterns;