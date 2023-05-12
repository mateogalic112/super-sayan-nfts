// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/ISuperSayanNFT.sol";

contract SuperSayanToken is ERC20, Ownable {
    uint256 public constant tokenPrice = 0.001 ether;

    uint256 public constant tokensPerNFT = 10 * 10 ** 18;
    uint256 public constant maxTotalSupply = 10000 * 10 ** 18;

    ISuperSayanNFT SuperSayanNFT;

    mapping(uint256 => bool) public tokenIdsClaimed;

    constructor(
        address _superSayanNFTContract
    ) ERC20("SuperSayan Token", "SST") {
        SuperSayanNFT = ISuperSayanNFT(_superSayanNFTContract);
    }

    function mint(uint256 amount) public payable {
        uint256 _requiredAmount = tokenPrice * amount;
        require(msg.value >= _requiredAmount, "Insufficient funds");
        uint256 amountWithDecimals = amount * 10 ** 18;
        require(
            (totalSupply() + amountWithDecimals) <= maxTotalSupply,
            "Exceeds max supply"
        );
        _mint(msg.sender, amountWithDecimals);
    }

    function claim() public {
        uint256 balance = SuperSayanNFT.balanceOf(msg.sender);
        require(balance > 0, "No NFTs");
        uint256 amount = 0;
        for (uint256 i = 0; i < balance; i++) {
            uint256 tokenId = SuperSayanNFT.tokenOfOwnerByIndex(msg.sender, i);
            if (!tokenIdsClaimed[tokenId]) {
                amount += 1;
                tokenIdsClaimed[tokenId] = true;
            }
        }
        require(amount > 0, "No new NFTs");
        _mint(msg.sender, amount * tokensPerNFT);
    }

    function withdraw() public onlyOwner {
        uint256 amount = address(this).balance;
        require(amount > 0, "No funds");

        address _owner = owner();
        (bool sent, ) = _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    receive() external payable {}

    fallback() external payable {}
}
