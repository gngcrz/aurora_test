require('@nomiclabs/hardhat-web3');

task('gate_init', 'Init whitelist account')
    .addParam('gate', 'NitroGate address')
    .setAction(async function ({ gate }, { ethers: { getSigners } }, runSuper) {
        const NitroGate = await ethers.getContractFactory('NitroGate');
        const nitroGate = NitroGate.attach(gate);
        const [nitroAdmin] = await ethers.getSigners();
        console.log('NitroAdmin is', nitroAdmin.address);
        console.log('NitroAdmin balance is', ethers.utils.formatEther(await nitroAdmin.getBalance()));

        const tx = await nitroGate.connect(nitroAdmin).grantWithdrawAccess(nitroAdmin.address);
        await tx.wait();

        console.log(`${nitroAdmin.address} has access to the withdraw method`);
    });

module.exports = {};
