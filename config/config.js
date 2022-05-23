require('dotenv').config();

module.exports = {
    HOST:process.env.HOST,
    USERNAME:process.env.USER_NAME,
    PASSWORD:process.env.PASSWORD,
    DB_NAME:process.env.DB_NAME,
    dialect:"mysql",
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}