const axios = require('axios')
const catchAsync = require('./../utils/catchAsync')
const wallet = '0x72d0455D25Db9c36af5869BBF426312bA923C643'
const API_KEY = process.env.ETHERSCAN_API
//const baseUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${wallet}&apikey=${API_KEY}`
//const baseUrl = `https://api.etherscan.io/api?module=account&action=txlist&startblock=0&endblock=99999999&page=1&offset=10&sort=asc`
const baseUrl = `https://api.etherscan.io/api?module=account&action=tokennfttx&page=1&offset=100&startblock=0&endblock=27025780&sort=asc`

createQuery = (wallet) =>{
    const walletParam = `&address=${wallet}`
    const apiParam = `&apikey=${API_KEY}`
    return baseUrl + walletParam + apiParam
}

exports.getTransactions = catchAsync(async(req,res,next) => {
    let url = createQuery(req.params.wallet)
    console.log(req.params)
    const transactions = await axios.get(url)
    if(!transactions){
        next()
    }
    //console.log(transactions.data)
    res.status(200).json({
        status:'success',
        data:{
            transactions:transactions.data
        }
    })  
})