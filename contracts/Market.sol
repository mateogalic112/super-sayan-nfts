// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Market is ERC1155 {
    uint256 public constant SWORD = 1;
    uint256 public constant SHIELD = 2;

    constructor() ERC1155("https://nftstorage.link/ipfs/bafybeibolwhzlssp7cqw6gppdbi3ipzyoynozs7gwedreqs4gtgkfaoqpe/{id}.json") {
        _mint(msg.sender, SWORD, 10**9, "");
        _mint(msg.sender, SHIELD, 10**9, "");
    }

    function uri(uint256 _tokenid) override public pure returns (string memory) {
        return string(
            abi.encodePacked(
                "https://nftstorage.link/ipfs/bafybeibolwhzlssp7cqw6gppdbi3ipzyoynozs7gwedreqs4gtgkfaoqpe/",
                Strings.toString(_tokenid),".json"
            )
        );
    }
}