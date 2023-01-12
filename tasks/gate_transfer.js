require('@nomiclabs/hardhat-web3');

task('gate_withdraw', 'Init whitelist account')
    .addParam('gate', 'NitroGate address')
    .addParam('seqno', 'Sequence number')
    .addParam('user', 'User address')
    .addParam('treasury', 'Treasury address')
    .addParam('amount', 'amount')
    .setAction(async function ({ gate, seqno, user, treasury, amount }, { ethers: { getSigners } }, runSuper) {
        const NitroGate = await ethers.getContractFactory('NitroGate');
        const nitroGate = NitroGate.attach(gate);
        const [nitroAdmin, transferAuthority] = await ethers.getSigners();
        console.log('       nitroAdmin:', nitroAdmin.address, ethers.utils.formatEther(await nitroAdmin.getBalance()), 'ETH');
        console.log('transferAuthority:', transferAuthority.address, ethers.utils.formatEther(await transferAuthority.getBalance()), 'ETH');

        console.time('transfer');
        const tx = await nitroGate.connect(transferAuthority).transfer(seqno, user, treasury, amount);
        await tx.wait();
        console.timeEnd('transfer');

        console.log('       nitroAdmin:', nitroAdmin.address, ethers.utils.formatEther(await nitroAdmin.getBalance()), 'ETH');
        console.log('transferAuthority:', transferAuthority.address, ethers.utils.formatEther(await transferAuthority.getBalance()), 'ETH');
    });

module.exports = {};
