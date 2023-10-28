const patterns =  {
    CHARACTERS_ONLY : /^[A-Za-z\s]+$/,
    PASSWORD_PATTERN : /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/,
}

export default patterns;