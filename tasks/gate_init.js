require('@nomiclabs/hardhat-web3');

task('gate_init', 'Init whitelist account')
    .addParam('gate', 'NitroGate address')
    .setAction(async function ({ gate }, { ethers: { getSigners } }, runSuper) {
        const NitroGate = await ethers.getContractFactory('NitroGate');
        const nitroGate = NitroGate.attach(gate);
        const [nitroAdmin] = await ethers.getSigners();
        console.log('NitroAdmin is', nitroAdmin.address);
        console.log('NitroAdmin balance is', ethers.utils.formatEther(await nitroAdmin.getBalance()));

        const tx = await nitroGate.connect(nitroAdmin).grantAccess(nitroAdmin.address);
        await tx.wait();

        console.log(`Access granted to ${nitroAdmin.address}`);
    });

module.exports = {};
