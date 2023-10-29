import { config } from 'dotenv'
config();

const { 
    PORT,
    DB_URL,
    SALT_ROUND,
    JWT_SECRET_KEY
} = process.env


export default {
    app: {
        port: PORT 
    },
    db:{
        url: DB_URL,
    },
    hash:{
        saltRounds: +SALT_ROUND,
    },
    jwt:{
        secret: JWT_SECRET_KEY
    }
}