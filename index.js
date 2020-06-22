// firebase cloud function にデプロイする場合
// const functions = require('firebase-functions');

const constants = require('./constants')
const myfunctions = require('./functions')

// Ethereum 関連
const Web3 = require('web3');
const provider = 'https://rinkeby.infura.io/v3/' + constants.projectId;
const web3 = new Web3(provider);

// express 関連
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


const tokenTransfer = async (tokenAddress, eoaAddress, amountDecimal) => {

    const decryptedAccount = web3.eth.accounts.privateKeyToAccount(constants.EOA_ADDRESS_TESTING2_PRIVATE_KEY);

    const gwei = 1000000000;
    let txCount = await web3.eth.getTransactionCount(decryptedAccount.address);

    let initialGasPrice = 10 * gwei;
    let nonce = txCount;

    let gasPrice = initialGasPrice;

    console.log(`nonce is ${nonce}`);
    console.log(`transfer is ${tokenAddress}, ${eoaAddress}`);

    console.log('Sending tx.. gasPrice:', gasPrice);
    const rawTransaction = myfunctions.generateRawTransaction(nonce, gasPrice, tokenAddress, eoaAddress, decryptedAccount.address, amountDecimal);
    console.log(`raw transaction is ${JSON.stringify(rawTransaction)}`);
    const signedTx = await decryptedAccount.signTransaction(rawTransaction);
    // console.log(`signed: ${JSON.stringify(signedTx)}`);

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log(`transaction sent.`)

    return receipt;
}

app.get('/', function (req, res) {
    const ether = req.query.ether.toString()
    const value = web3.utils.toWei(ether, 'Ether');
    console.log(`value is ${value}`)
    res.send(`value is ${value}\n`)
})

app.get('/new_address', function (req, res) {

    const account = web3.eth.accounts.create();

    console.log(`mylib is ${mylib.myfunc()}`);

    // サーバーで鍵を生成する。テストネットなのでできる。
    res.send(`account private key is ${account.privateKey}\n`)
})

app.get('/balance', async function (req, res) {

    const toAddress = req.query.of;
    const tokenAddress = req.query.token;

    const balance = await myfunctions.getBalance(tokenAddress, toAddress);

    console.log(`balance is ${JSON.stringify(balance)}`);

    res.send(`balance of ${toAddress} is ${JSON.stringify(balance)}`)
})

app.post('/send_token/', async (req, res) => {

    console.log(req.body);
    // example
    //  { to_address: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    //   token_address: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
    //   amount_decimal: '0.12345678' }

    const result = await tokenTransfer(req.body.token_address, req.body.to_address, req.body.amount_decimal)

    res.send(result);
    // example response
    // {
    //     "blockHash": "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    //     "blockNumber": 670000,
    //     "contractAddress": null,
    //     "cumulativeGasUsed": 33333,
    //     "from": "0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    //     "gasUsed": 33333,
    //     "logs": [
    //         {
    //             "address": "0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    //             "blockHash": "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    //             "blockNumber": 6777777,
    //             "data": "0x0000000000000000000000000000000000000000000000000xxxxxxxxxxxxxx",
    //             "logIndex": 0,
    //             "removed": false,
    //             "topics": [
    //                 "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    //                 "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    //                 "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    //             ],
    //             "transactionHash": "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    //             "transactionIndex": 0,
    //             "id": "log_e7777777"
    //         }
    //     ],
    //     "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000040000000000000000000000000000000000000000000100000000000000000000000000000000010000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000040000000000000000000000100000000000000000000000002000000000000000040000000000000000000400000000000000040000004000000000000000000000000000000000000000000000000000000000000",
    //     "status": true,
    //     "to": "0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    //     "transactionHash": "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    //     "transactionIndex": 0
    // }

})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

// when deploying to firebase cloud function 
// exports.app = functions.https.onRequest(app);

