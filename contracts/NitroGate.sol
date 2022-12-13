// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract NitroGate {
    ERC20 token;
    address whitelistAuthority;
    address transferAuthority;
    mapping(address => bool) whitelist;

    constructor(address _token, address _transferAuthority) {
        token = ERC20(_token);
        whitelistAuthority = msg.sender;
        transferAuthority = _transferAuthority;
    }

    function getWhitelistAuthority() public view returns (address) {
        return whitelistAuthority;
    }

    function getTransferAuthority() public view returns (address) {
        return transferAuthority;
    }

    function allowTransferTo(address spender) public onlyWhitelistAuthority {
        whitelist[spender] = true;
    }

    function denyTransferTo(address spender) public onlyWhitelistAuthority {
        whitelist[spender] = false;
    }

    function transfer(address from, address to, uint256 amount) public {
        require(msg.sender == transferAuthority, "Access denied");
        require(whitelist[to], "Account not found");
        token.transferFrom(from, to, amount);
    }

    modifier onlyWhitelistAuthority() {
        require(msg.sender == whitelistAuthority, "Only whitelist authority can do that");
        _;
    }
}
