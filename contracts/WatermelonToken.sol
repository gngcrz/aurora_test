// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WatermelonToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Fake USDC", "USDC-0") {
        _mint(msg.sender, initialSupply);
    }

    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    function decimals() public pure override(ERC20) returns (uint8) {
        return 6;
    }
}
