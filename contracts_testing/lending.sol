// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ARBCETH is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("ARBCETH", "ARBCETH") Ownable(msg.sender) {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}

contract LendingPlatform {
    ARBCETH public arbceth;
    mapping(address => uint256) public deposits;

    constructor() {
        arbceth = new ARBCETH();
    }

    receive() external payable {
        deposit();
    }

    function deposit() public payable {
        require(msg.value > 0, "Must deposit ETH");
        deposits[msg.sender] += msg.value;
        arbceth.mint(msg.sender, msg.value); // Mint ARBCETH to the depositor
    }

    function withdraw(uint256 amount) public {
        require(deposits[msg.sender] >= amount, "Insufficient balance");
        require(arbceth.balanceOf(msg.sender) >= amount, "Not enough ARBCETH");

        deposits[msg.sender] -= amount;
        arbceth.burnFrom(msg.sender, amount);
        payable(msg.sender).transfer(amount);
    }
}
