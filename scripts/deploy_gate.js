// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
require('dotenv').config();
const hre = require('hardhat');

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    const provider = hre.ethers.provider;
    const deployerWallet = new hre.ethers.Wallet(process.env.AURORA_PRIVATE_KEY, provider);
    const tokenAddress = process.env.TOKEN_ADDRESS;

    console.log('Deploying contracts with the account:', deployerWallet.address);
    console.log('Account balance:', (await deployerWallet.getBalance()).toString());
    console.log('Token address:', tokenAddress);

    const NitroGate = await hre.ethers.getContractFactory('NitroGate');
    const nitroGate = await NitroGate.connect(deployerWallet).deploy(tokenAddress);
    await nitroGate.deployed();

    console.log('NitroGate deployed to:', nitroGate.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
