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
    jwtConstants:{ 
        secret: JWT_SECRET_KEY,
        signOptions: { expiresIn: '3d' },
    }
}