// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TipJar {
    address public owner;

    event TipReceived(address indexed from, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function tip() public payable {
        require(msg.value > 0, "Tip must be greater than 0");
        emit TipReceived(msg.sender, msg.value);
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}
