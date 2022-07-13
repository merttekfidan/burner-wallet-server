const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const transactionRouter = require('./routes/transactionRoutes')
const app = express()
dotenv.config({ path: './config.env' });
const API_KEY = process.env.ETHERSCAN_API
app.use(cors())
app.use('/api/v1',transactionRouter)



module.exports = app