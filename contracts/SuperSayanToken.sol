// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/ISuperSayanNFT.sol";

contract SuperSayanToken is ERC20, Ownable {
    uint256 public constant tokenPrice = 0.001 ether;
    // Each NFT would give the user 10 tokens
    uint256 public constant tokensPerNFT = 10 * 10 ** 18;
    uint256 public constant maxTotalSupply = 10000 * 10 ** 18;
    // CryptoDevsNFT contract instance
    ISuperSayanNFT SuperSayanNFT;
    // Mapping to keep track of which tokenIds have been claimed
    mapping(uint256 => bool) public tokenIdsClaimed;

    constructor(
        address _superSayanNFTContract
    ) ERC20("SuperSayan Token", "SST") {
        SuperSayanNFT = ISuperSayanNFT(_superSayanNFTContract);
    }

    /**
     * @dev Mints `amount` number of SuperSayan Tokens
     * Requirements:
     * - `msg.value` should be equal or greater than the tokenPrice * amount
     */
    function mint(uint256 amount) public payable {
        // the value of ether that should be equal or greater than tokenPrice * amount;
        uint256 _requiredAmount = tokenPrice * amount;
        require(msg.value >= _requiredAmount, "Insufficient funds");
        // total tokens + amount <= 10000, otherwise revert the transaction
        uint256 amountWithDecimals = amount * 10 ** 18;
        require(
            (totalSupply() + amountWithDecimals) <= maxTotalSupply,
            "Exceeds max supply"
        );
        // call the internal function from Openzeppelin's ERC20 contract
        _mint(msg.sender, amountWithDecimals);
    }

    /**
     * @dev Mints tokens based on the number of NFT's held by the sender
     * Requirements:
     * balance of SuperSayan NFT's owned by the sender should be greater than 0
     * Tokens should have not been claimed for all the NFTs owned by the sender
     */
    function claim() public {
        // Get the number of SuperSayan NFT's held by a given sender address
        uint256 balance = SuperSayanNFT.balanceOf(msg.sender);
        // If the balance is zero, revert the transaction
        require(balance > 0, "No NFTs");
        // amount keeps track of number of unclaimed tokenIds
        uint256 amount = 0;
        // loop over the balance and get the token ID owned by `msg.sender` at a given `index` of its token list.
        for (uint256 i = 0; i < balance; i++) {
            uint256 tokenId = SuperSayanNFT.tokenOfOwnerByIndex(msg.sender, i);
            // if the tokenId has not been claimed, increase the amount
            if (!tokenIdsClaimed[tokenId]) {
                amount += 1;
                tokenIdsClaimed[tokenId] = true;
            }
        }
        // If all the token Ids have been claimed, revert the transaction;
        require(amount > 0, "No new NFTs");
        // call the internal function from Openzeppelin's ERC20 contract
        // Mint (amount * 10) tokens for each NFT
        _mint(msg.sender, amount * tokensPerNFT);
    }

    /**
     * @dev withdraws all ETH sent to this contract
     * Requirements:
     * wallet connected must be owner's address
     */
    function withdraw() public onlyOwner {
        uint256 amount = address(this).balance;
        require(amount > 0, "No funds");

        address _owner = owner();
        (bool sent, ) = _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
