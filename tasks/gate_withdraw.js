require('@nomiclabs/hardhat-web3');

task('gate_withdraw', 'Init whitelist account')
    .addParam('gate', 'NitroGate address')
    .setAction(async function ({ gate }, { ethers: { getSigners } }, runSuper) {
        const NitroGate = await ethers.getContractFactory('NitroGate');
        const nitroGate = NitroGate.attach(gate);
        const [nitroAdmin] = await ethers.getSigners();
        console.log('NitroAdmin is', nitroAdmin.address);
        console.log('NitroAdmin balance is', ethers.utils.formatEther(await nitroAdmin.getBalance()));

        console.time('withdraw');
        const tx = await nitroGate.connect(nitroAdmin).withdraw(nitroAdmin.address, 1);
        await tx.wait();
        console.timeEnd('withdraw');

        console.log('NitroAdmin balance is', ethers.utils.formatEther(await nitroAdmin.getBalance()));
    });

module.exports = {};
