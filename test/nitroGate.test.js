const { expect } = require('chai');

describe('Nitro Gate', function () {
    it('Should accept withdrawals by a whitelisted nitro account', async function () {
        const [tokenAdmin, nitroAdmin, nitroUser, whitelistedNitroAccount, randomUser] = await ethers.getSigners();

        // Token USDC
        const Token = await ethers.getContractFactory('WatermelonToken');
        const token = await Token.deploy(100000);
        const tokenAdminBalance = await token.balanceOf(tokenAdmin.address);
        expect(await token.totalSupply()).to.equal(tokenAdminBalance);

        // Nitro user has $1000
        await token.connect(tokenAdmin).transfer(nitroUser.address, 1000);

        // Contract
        const NitroGate = await ethers.getContractFactory('NitroGate', nitroAdmin);
        const nitroGate = await NitroGate.deploy(token.address);

        // Access management
        await expect(nitroGate.connect(randomUser).grantWithdrawAccess(randomUser.address)).be.revertedWith('Only whitelist authority can do that');
        await expect(nitroGate.connect(randomUser).revokeWithdrawAccess(randomUser.address)).be.revertedWith('Only whitelist authority can do that');

        // Main scenario
        await nitroGate.connect(nitroAdmin).grantWithdrawAccess(whitelistedNitroAccount.address);

        await token.connect(nitroUser).approve(nitroGate.address, 100);
        await nitroGate.connect(whitelistedNitroAccount).withdraw(nitroUser.address, 100);

        // Result
        const whitelistedNitroAccountBalance = await token.balanceOf(whitelistedNitroAccount.address);
        expect(whitelistedNitroAccountBalance).to.equal(100);
    });
});
