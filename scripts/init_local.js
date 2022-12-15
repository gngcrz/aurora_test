// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
require('dotenv').config();
const hre = require('hardhat');

async function main() {
    const provider = hre.ethers.provider;

    const tokenAdmin = new hre.ethers.Wallet('0x701b615bbdfb9de65240bc28bd21bbc0d996645a3dd57e7b12bc2bdf6f192c82', provider);
    const nitroAdmin = new hre.ethers.Wallet('0xc526ee95bf44d8fc405a158bb884d9d1238d99f0612e9f33d006bb0789009aaa', provider);
    const transferAuthority = new hre.ethers.Wallet('0xa267530f49f8280200edf313ee7af6b827f2a8bce2897751d06a843f644967b1', provider);

    const whitelistedAddressOne = new hre.ethers.Wallet('0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0', provider);
    const whitelistedAddressTwo = new hre.ethers.Wallet('0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e', provider);

    const showWallet = async (name, wallet) => {
        console.log(name, wallet.address, 'balance', (await wallet.getBalance()).toString());
    };

    // DEPLOY TOKEN
    showWallet('tokenAdmin', tokenAdmin);
    showWallet('nitroAdmin', nitroAdmin);
    showWallet('transferAuthority', transferAuthority);
    showWallet('whitelistedAddressOne', whitelistedAddressOne);
    showWallet('whitelistedAddressTwo', whitelistedAddressTwo);

    const WatermelonToken = await hre.ethers.getContractFactory('WatermelonToken');
    const watermelonToken = await WatermelonToken.connect(tokenAdmin).deploy(1000000);
    await watermelonToken.deployed();
    console.log('WatermelonToken deployed to:', watermelonToken.address);

    // DEPLOY N2GATE
    const NitroGate = await ethers.getContractFactory('NitroGate', nitroAdmin);
    const n2gate = await NitroGate.deploy(watermelonToken.address, transferAuthority.address);
    console.log('NitroGate deployed to:', n2gate.address);

    // WHITELIST ADDRESSES
    await n2gate.connect(nitroAdmin).allowTransferTo(whitelistedAddressOne.address);
    await n2gate.connect(nitroAdmin).allowTransferTo(whitelistedAddressTwo.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
