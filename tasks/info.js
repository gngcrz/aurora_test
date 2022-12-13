require('@nomiclabs/hardhat-web3');

task('info', "Prints an account's balance")
    .setAction(async taskArgs => {
        const [firstSigner] = await ethers.getSigners();
        console.log('Signer is', firstSigner.address);
        const balance = await web3.eth.getBalance(firstSigner.address);
        console.log(web3.utils.fromWei(balance, 'ether'), 'ETH');
    });

module.exports = {};
