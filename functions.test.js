const constants = require('./constants')
const functions = require('./functions')
const Web3 = require('web3');

test('testing func2', () => {
    // expect(functions.add(2,2)).toBe(4);
    expect(functions.func2(4)).toBe(123);
    expect(functions.func2(4)).not.toBe(1234);
})

test('testing x squared', () => {
    expect(functions.func3(-2)).toBe(4);
    expect(functions.func3(4)).toBe(16);
})

test('testing get balance', async () => {
    const result = await functions.getBalance(constants.tokenAddress, constants.eoaAddressForTesting)
    console.log(`result is ${result}`)
    const balance = parseInt(result)
    expect(balance).toBeGreaterThan(100);
})

test('get nonce', async () => {
    const address = constants.eoaAddressForTesting2;
    const result = await functions.getNonce(address);
    const nonce = parseInt(result);
    console.log(`nonce is ${nonce}`);
    // nonce is the number of transactions that the account has sent.
    expect(nonce).toBeGreaterThan(8);
})

test('testing eoa account decryption from private key', async () => {

    const provider = 'https://rinkeby.infura.io/v3/' + constants.projectId;
    const web3 = new Web3(provider);

    // check that the given private key decrypts the correct account.
    const decryptedAccount = web3.eth.accounts.privateKeyToAccount(constants.eoaAddressForTesting2PrivateKey);
    expect(decryptedAccount.address).toBe(constants.eoaAddressForTesting2);
})

// test('generating raw transaction', async () => {

//     const address = constants.eoaAddressForTesting2;
//     const result = await functions.getNonce(address);
//     const nonce = parseInt(result);

//     const gwei = 1000000000;
//     let initialGasPrice = 10 * gwei;
//     let gasPrice = initialGasPrice;
//     const tokenAddress = constants.tokenAddress;
//     const eoaAddress = constants.eoaAddressForTesting;
//     const originAddress = decryptedAccount.address

//     generateRawTransaction(nonce, gasPrice, tokenAddress, eoaAddress, originAddress, amountDecimal)
// })