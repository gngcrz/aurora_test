require('@nomiclabs/hardhat-web3');

task('transfer', 'ERC20 transfer')
    .addParam('token', 'Token address')
    .addParam('spender', 'Spender address')
    .addParam('amount', 'Token amount')
    .setAction(async function ({ token, spender, amount }, { ethers: { getSigners } }, runSuper) {
        const watermelonToken = await ethers.getContractFactory('WatermelonToken');
        const watermelon = watermelonToken.attach(token);
        const [minter] = await ethers.getSigners();
        console.log('minter is', minter.address);
        console.log('minter balance is', ethers.utils.formatEther(await minter.getBalance()));
        console.log('spender is', spender);

        const tx = await watermelon.connect(minter).transfer(spender, amount);
        await tx.wait();
        console.log(`${minter.address} has transferred ${amount} tokens to ${spender}`);
    });

module.exports = {};
