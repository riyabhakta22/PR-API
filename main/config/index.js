const dotenv = require('dotenv')
dotenv.config()

const { DB_URL, PORT , JWT_SECRET } = process.env

const Config = { DB_URL, PORT, JWT_SECRET} 

module.exports = Config