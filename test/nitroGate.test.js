const { expect } = require('chai');

describe('Nitro Gate', function () {
    let usdc;
    let n2gate;

    let tokenAdmin;
    let admin;
    let transferAuthority;
    let user;
    let randomUser;
    let whitelistedAddressOne;
    let whitelistedAddressTwo;

    beforeEach(async function () {
        [tokenAdmin, admin, transferAuthority, user, randomUser, whitelistedAddressOne, whitelistedAddressTwo] = await ethers.getSigners();

        const UsdcToken = await ethers.getContractFactory('WatermelonToken', tokenAdmin);
        usdc = await UsdcToken.deploy(100000);
        await usdc.connect(tokenAdmin).transfer(user.address, 1000);

        const NitroGate = await ethers.getContractFactory('NitroGate', admin);
        n2gate = await NitroGate.deploy(usdc.address, transferAuthority.address);

        await usdc.connect(user).approve(n2gate.address, 100);
    });

    it('Should init whitelist authority', async function () {
        expect(await n2gate.getWhitelistAuthority()).eq(admin.address);
    });

    it('Should init transfer authority', async function () {
        expect(await n2gate.getTransferAuthority()).eq(transferAuthority.address);
    });

    it('Should deny transfer user tokens by random user', async function () {
        await expect(n2gate.connect(randomUser).transfer(1, user.address, randomUser.address, 100)).be.revertedWith('Access denied');
    });

    it('Should deny transfer user tokens to unkown addresses', async function () {
        await expect(n2gate.connect(transferAuthority).transfer(1, user.address, randomUser.address, 100)).be.revertedWith('Account not found');
    });

    it('Should deny to update whitelist by random user', async function () {
        await expect(n2gate.connect(randomUser).allowTransferTo(randomUser.address)).be.revertedWith('Only whitelist authority can do that');
        await expect(n2gate.connect(randomUser).denyTransferTo(randomUser.address)).be.revertedWith('Only whitelist authority can do that');
    });

    it('Should return allowance', async function () {
        expect(await n2gate.getUserAllowance(tokenAdmin.address)).eq(0);
        expect(await n2gate.getUserAllowance(user.address)).eq(100);
    });

    it('Should transfer user tokens to the whitelisted addresses and increment sequence number', async function () {
        await n2gate.connect(admin).allowTransferTo(whitelistedAddressOne.address);
        await n2gate.connect(admin).allowTransferTo(whitelistedAddressTwo.address);

        await n2gate.connect(transferAuthority).transfer(1, user.address, whitelistedAddressOne.address, 30);
        expect(await n2gate.getSequenceNumber()).to.equal(1);
        expect(await usdc.balanceOf(whitelistedAddressOne.address)).to.equal(30);

        await n2gate.connect(transferAuthority).transfer(2, user.address, whitelistedAddressTwo.address, 40);
        expect(await n2gate.getSequenceNumber()).to.equal(2);
        expect(await usdc.balanceOf(whitelistedAddressTwo.address)).to.equal(40);
    });

    it('Should reject transfer if an unexpected sequence number was passed', async function () {
        await n2gate.connect(admin).allowTransferTo(whitelistedAddressOne.address);
        await expect(n2gate.connect(transferAuthority).transfer(2, user.address, whitelistedAddressOne.address, 30)).be.revertedWith(
            'Wrong sequence number'
        );
        await expect(n2gate.connect(transferAuthority).transfer(0, user.address, whitelistedAddressOne.address, 30)).be.revertedWith(
            'Wrong sequence number'
        );
    });
});
