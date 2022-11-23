require('@nomiclabs/hardhat-waffle');
require('./tasks/account');
require('./tasks/transfer');
require('./tasks/totalSupply');
require('./tasks/balanceOf');
require('./tasks/approve');
require('./tasks/transferFrom');
require('./tasks/gate_init');
require('./tasks/gate_withdraw');
// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
require('dotenv').config();

const AURORA_PRIVATE_KEY = process.env.AURORA_PRIVATE_KEY;

module.exports = {
    solidity: '0.8.0',
    networks: {
        testnet_aurora: {
            url: 'https://testnet.aurora.dev',
            accounts: [`0x${AURORA_PRIVATE_KEY}`],
            chainId: 1313161555,
            gasPrice: 1 * 1000000000,
        },
        local_aurora: {
            url: 'http://localhost:8545',
            accounts: [`0x${AURORA_PRIVATE_KEY}`],
            chainId: 1313161555,
            gasPrice: 120 * 1000000000,
        },
        ropsten: {
            url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
            accounts: [`0x${AURORA_PRIVATE_KEY}`],
            chainId: 3,
            live: true,
            gasPrice: 50 * 1000000000,
            gasMultiplier: 2,
        },
        mainnet_aurora: {
            url: `https://mainnet.aurora.dev`,
            accounts: [`0x${AURORA_PRIVATE_KEY}`],
            chainId: 1313161554,
            live: true,
            gasPrice: 1 * 1000000000,
            gasMultiplier: 1,
        },
    },
};
