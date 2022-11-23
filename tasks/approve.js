require('@nomiclabs/hardhat-web3');

task('approve', 'ERC20 approve')
    .addParam('token', 'Token address')
    .addParam('spender', 'Spender address')
    .addParam('amount', 'Token amount')
    .setAction(async function ({ token, spender, amount }, { ethers: { getSigners } }, runSuper) {
        const watermelonToken = await ethers.getContractFactory('WatermelonToken');
        const watermelon = watermelonToken.attach(token);
        const [sender] = await ethers.getSigners();
        await (await watermelon.connect(sender).approve(spender, amount)).wait();
        console.log(`${sender.address} has approved ${amount} tokens to ${spender}`);
        console.log(`== Owner: ${sender.address}`);
        const totalAmount = await watermelon.balanceOf(sender.address);
        console.log(`    Total amount: ${totalAmount}`);
        const allowanceAmount = await watermelon.allowance(sender.address, spender);
        console.log(`Allowance amount: ${allowanceAmount}`);
    });

module.exports = {};
