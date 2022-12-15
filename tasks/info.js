require('@nomiclabs/hardhat-web3');

task('info', "Prints an account's balance")
    .addParam('token', 'Token address')
    .setAction(async function ({ token }, { ethers: { getSigners } }, runSuper) {
        const provider = hre.ethers.provider;
        const nitroUser = new hre.ethers.Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider);
        const whitelistedAddressOne = new hre.ethers.Wallet('0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0', provider);
        const whitelistedAddressTwo = new hre.ethers.Wallet('0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e', provider);

        const watermelonToken = await ethers.getContractFactory('WatermelonToken');
        const watermelon = watermelonToken.attach(token);

        const balanceOf = async (tag, signer) => {
            const account = signer.address;
            const balance = await watermelon.balanceOf(account);
            console.log(`${tag}: Address ${account} has a total token balance:  ${balance} WTM`);
        };
        const allowance = async (tag, ownerAccount, spenderAccount) => {
            const amount = await watermelon.allowance(ownerAccount, spenderAccount);
            console.log(`${tag}: approved ${amount} WTM to the ${spenderAccount}`);
        };
        await balanceOf('nitroUser', nitroUser);
        await balanceOf('whitelistedAddressOne', whitelistedAddressOne);
        await balanceOf('whitelistedAddressTwo', whitelistedAddressTwo);
        await allowance('nitroUser', nitroUser.address, '0xa196769Ca67f4903eCa574F5e76e003071A4d84a');
    });

module.exports = {};
