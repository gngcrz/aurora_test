require('@nomiclabs/hardhat-waffle');
require('./tasks/approve');
require('./tasks/balance');
require('./tasks/balanceOf');
require('./tasks/gate_init');
require('./tasks/gate_transfer');
require('./tasks/info');
require('./tasks/totalSupply');
require('./tasks/transfer');
require('./tasks/transferFrom');
// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
require('dotenv').config();

const NITRO_ADMIN = process.env.NITRO_ADMIN;
const TRANSFER_AUTHORITY = process.env.TRANSFER_AUTHORITY;

module.exports = {
    solidity: '0.8.0',
    networks: {
        rpc: {
            url: 'http://ac6c9227ce91ef88.relayer.mainnet.partners.aurora.dev',
            accounts: [`0x${NITRO_ADMIN}`, `0x${TRANSFER_AUTHORITY}`],
            chainId: 1313161554,
            gasPrice: 1 * 1000000000,
        },
        testnet_aurora: {
            url: 'https://testnet.aurora.dev',
            accounts: [`0x${NITRO_ADMIN}`, `0x${TRANSFER_AUTHORITY}`],
            chainId: 1313161555,
            gasPrice: 1 * 1000000000,
        },
        local_aurora: {
            url: 'http://localhost:8545',
            accounts: [`0x${NITRO_ADMIN}`, `0x${TRANSFER_AUTHORITY}`],
            chainId: 31337,
            gasPrice: 120 * 1000000000,
        },
        ropsten: {
            url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
            accounts: [`0x${NITRO_ADMIN}`, `0x${TRANSFER_AUTHORITY}`],
            chainId: 3,
            live: true,
            gasPrice: 50 * 1000000000,
            gasMultiplier: 2,
        },
        mainnet_aurora: {
            url: `https://mainnet.aurora.dev`,
            accounts: [`0x${NITRO_ADMIN}`, `0x${TRANSFER_AUTHORITY}`],
            chainId: 1313161554,
            live: true,
            gasPrice: 1 * 1000000000,
            gasMultiplier: 1,
        },
    },
};
