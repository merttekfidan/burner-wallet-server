const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const transactionRouter = require('./routes/transactionRoutes')
const app = express()
dotenv.config({ path: './config.env' });
const API_KEY = process.env.ETHERSCAN_API
app.use(cors())
//Cors Configuration - Start
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "POST, PUT, PATCH, GET, DELETE"
        )
        return res.status(200).json({})
    }
    next()
})
//Cors Configuration - End
app.use('/api/v1', transactionRouter)



module.exports = app