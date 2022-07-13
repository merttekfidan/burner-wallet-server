const express = require('express')
const transactionController = require('./../controllers/transactionController')
const alchemyController = require('./../controllers/alchemyController')
const router = express.Router()

//router.get('/get-transactions-by-wallet/:wallet',transactionController.getTransactions)
router.get('/get-transactions-from-wallet/:wallet', alchemyController.getTnxListFromSelectedWallet)
router.get('/get-transactions-to-wallet/:wallet', alchemyController.getTnxListToSelectedWallet)

module.exports = router