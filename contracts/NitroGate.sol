// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract NitroGate {
    ERC20 token;
    address whitelistAuthority;
    address transferAuthority;
    uint256 sequenceNumber;
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

    function getSequenceNumber() public view returns (uint256) {
        return sequenceNumber;
    }

    function getUserAllowance(address user) public view returns (uint256) {
        return token.allowance(user, address(this));
    }

    function allowTransferTo(address treasury) public onlyWhitelistAuthority {
        whitelist[treasury] = true;
    }

    function denyTransferTo(address treasury) public onlyWhitelistAuthority {
        whitelist[treasury] = false;
    }

    function transfer(uint256 nextSequenceNumber, address user, address treasury, uint256 amount) public {
        require(nextSequenceNumber == sequenceNumber + 1, "Wrong sequence number");
        require(msg.sender == transferAuthority, "Access denied");
        require(whitelist[treasury], "Account not found");
        token.transferFrom(user, treasury, amount);
        sequenceNumber = nextSequenceNumber;
    }

    modifier onlyWhitelistAuthority() {
        require(msg.sender == whitelistAuthority, "Only whitelist authority can do that");
        _;
    }
}
