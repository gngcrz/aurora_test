// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract NitroGate {
    ERC20 token;
    address whitelistAuthority;
    mapping(address => bool) whitelist;
 
    constructor(address _token) {
        token = ERC20(_token);
        whitelistAuthority = msg.sender;
    }

    // function updateWhitelistAuthority(address newWhitelistAuthority) public {}

    function grantWithdrawAccess(address spender) public onlyWhitelistAuthority {
        whitelist[spender] = true;
    }

    function revokeWithdrawAccess(address spender) public onlyWhitelistAuthority {
        whitelist[spender] = false;
    }

    function withdraw(address user, uint256 amount) public {
        require(whitelist[msg.sender], "Access denied");
        token.transferFrom(user, msg.sender, amount);
    }

    modifier onlyWhitelistAuthority() {
        require(msg.sender == whitelistAuthority, "Only whitelist authority can do that");
        _;
    }
}
