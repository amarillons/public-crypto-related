const constants = require('./constants')
const Web3 = require('web3');

const functions = {
    add: (num1, num2) => {
        return num1 + num2
    },
    func2: (x) => {
        return 123;
    },
    func3: (x) => {
        return x * x;
    },
    getBalance: async (tokenAddress, eoaAddress) => {

        const provider = 'https://rinkeby.infura.io/v3/' + constants.projectId;
        const web3 = new Web3(provider);

        const balance = await web3.eth.call({
            to: tokenAddress,
            data: '0x70a08231000000000000000000000000' + eoaAddress.slice(2),
        })

        // console.log(`balance is ${balance}`)
        console.log(`token address is ${tokenAddress}`);
        console.log(`eoa address is ${eoaAddress}`);

        // return balance;

        return web3.utils.hexToNumberString(balance);
    }
}

module.exports = functions;