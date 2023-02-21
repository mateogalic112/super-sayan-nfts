// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SuperSayanNFT is ERC721, ERC721Burnable, Ownable {
    string public baseUri;

    mapping(address => uint256[]) myNfts;
    uint256 public constant TOKEN_MAX_SUPPLY = 7000;
    uint256 public tokenIds;

    uint88 public tokenPrice = 0.05 ether;

    constructor(string memory _baseUri) ERC721("SuperSayanNFT", "SSY") {
        baseUri = _baseUri;
    }

    function mint() external payable {
        require(tokenIds < TOKEN_MAX_SUPPLY, "Exceed maximum supply");
        require(msg.value >= tokenPrice, "Not enough tokens sent");
        tokenIds += 1;
        myNfts[msg.sender].push(tokenIds);
        _safeMint(msg.sender, tokenIds);
    }

    function withdrawFunds() external onlyOwner {
        address _owner = owner();
        payable(_owner).transfer(address(this).balance);
    }

    function fetchMyNfts() external view returns (uint256[] memory) {
        return myNfts[msg.sender];
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
