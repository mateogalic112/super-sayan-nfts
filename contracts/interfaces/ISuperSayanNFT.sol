// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface ISuperSayanNFT {
    function tokenOfOwnerByIndex(
        address owner,
        uint256 index
    ) external view returns (uint256 tokenId);

    function balanceOf(address owner) external view returns (uint256 balance);

    function ownerOf(uint256 tokenId) external view returns (address);
}
