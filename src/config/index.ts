const { 
    PORT,
    DB_URL,
} = process.env

console.log(PORT);


export default {
    app: {
        port: PORT 
    },
    db:{
        url: DB_URL,
    }
}