// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "./interfaces/IMarket.sol";
import "./interfaces/ISuperSayanNFT.sol";

contract GameEngine is Initializable, OwnableUpgradeable, ERC1155Holder {
    IMarket public market;
    ISuperSayanNFT public sayans;

    mapping(uint256 => uint256[]) public attachedItems;

    function initialize(address _market, address _sayans) public initializer {
        market = IMarket(_market);
        sayans = ISuperSayanNFT(_sayans);
    }

    function attachItemToSayan(uint256 tokenId, uint256 item) public {
        require(sayans.ownerOf(tokenId) == msg.sender, "Invalid owner");
        attachedItems[tokenId].push(item);
    }

    function attachItem(uint256 tokenId, uint256 itemId) public {
        require(
            msg.sender == sayans.ownerOf(tokenId),
            "Only the owner can attach items to this NFT"
        );
        market.safeTransferFrom(msg.sender, address(this), itemId, 1, "");
    }

    function getAttachedItemsToSayan(
        uint256 tokenId
    ) public view returns (uint256[] memory) {
        return attachedItems[tokenId];
    }
}
