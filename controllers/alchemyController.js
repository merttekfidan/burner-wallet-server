const axios = require('axios')
const catchAsync = require('./../utils/catchAsync')

const mixTnx = 2;
const API_KEY = process.env.ALCHEMY_API_KEY
const baseUrl = `https://eth-mainnet.alchemyapi.io/v2/${API_KEY}`

const customizedRequest = (method, params) => {
    let data = {
        jsonrpc: "2.0",
        id: 0,
        method: method,
        params: params
    }
    return requestOptions = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: data,
    };
}

const groupAndSortByWallet = (tnxs, orderedBy) => {
    const grouped = tnxs.reduce((group, tnx) => {
        if (orderedBy === 'to') {
            const { to } = tnx;
            group[to] = group[to] ?? [];
            group[to].push(tnx)
        } else {
            const { from } = tnx;
            group[from] = group[from] ?? [];
            group[from].push(tnx)
        }


        return (group);
    }, [])
    const adjusted = Object.entries(grouped).map(([key, value], index) => {
        //console.log(`key: ${key} - length:${value}`)
        return ({ walletAddress: key, length: value.length, transfers: value })
    })
    return (adjusted);
}

exports.getTnxListToSelectedWallet = catchAsync(async (req, res, next) => {
    const tnxListToWallet = await axios(baseUrl,
        customizedRequest('alchemy_getAssetTransfers',
            [{
                "toAddress": req.params.wallet,
                "category": ['erc721'],
                withMetadata: true
            }
            ]))
        .then(response => {
            const groupedAndSortedTnx = groupAndSortByWallet(response.data.result.transfers, 'from')
            console.log('Data: ', response.data.result.transfers)
            res.status(200).json({
                status: 'success',
                data: groupedAndSortedTnx,
                pure: response.data.result.transfers
            })
        })
        .catch(err => {
            console.log(err)
        })
})

exports.getTnxListFromSelectedWallet = catchAsync(async (req, res, next) => {
    const tnxListFromWallet = await axios(baseUrl,
        customizedRequest('alchemy_getAssetTransfers',
            [{
                "fromAddress": req.params.wallet,
                "category": ['erc721'],
                withMetadata: true
            }
            ]))
        .then(response => {
            const groupedAndSortedTnx = groupAndSortByWallet(response.data.result.transfers, 'to')
            res.status(200).json({
                status: 'success',
                data: groupedAndSortedTnx,
                pure: response.data.result.transfers
            })
        })
        .catch(err => {
            console.log(err)
        })
})