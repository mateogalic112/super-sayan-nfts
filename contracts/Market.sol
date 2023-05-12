// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Market is ERC1155 {
    enum ItemType {
        LEFT_HAND,
        RIGHT_HAND,
        HEAD,
        BODY,
        LEGS
    }

    struct MarketItem {
        uint256 price;
        uint256 maxSupply;
        ItemType itemType;
    }

    uint256 public constant SWORD = 1;
    uint256 public constant SHIELD = 2;
    uint256 public constant HELMET = 3;

    mapping(uint256 => MarketItem) private _marketItems;

    constructor()
        ERC1155(
            "https://nftstorage.link/ipfs/bafybeiakrmpdau6mik5z6dcm7szaejb4w6ml5u7minenmfiegv6c7hehwi/{id}.json"
        )
    {
        _marketItems[SWORD] = MarketItem(0.05 ether, 100, ItemType.RIGHT_HAND);
        _marketItems[SHIELD] = MarketItem(0.025 ether, 200, ItemType.LEFT_HAND);
        _marketItems[HELMET] = MarketItem(0.0125 ether, 300, ItemType.HEAD);
    }

    function mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public payable {
        require(
            msg.value * amount >= _marketItems[id].price * amount,
            "Item price costs more."
        );
        require(
            balanceOf(msg.sender, id) + amount <= _marketItems[id].maxSupply,
            "Maximum supply reached."
        );
        _mint(to, id, amount, data);
    }

    function getMarketItem(
        uint256 itemId
    ) public view returns (MarketItem memory) {
        return _marketItems[itemId];
    }

    function checkDuplicateItemType(
        uint256 itemId,
        uint256[] memory itemsIds
    ) public view returns (bool) {
        MarketItem memory itemToCheck = getMarketItem(itemId);

        for (uint i = 0; i < itemsIds.length; i++) {
            MarketItem memory item = getMarketItem(itemsIds[i]);
            if (itemToCheck.itemType == item.itemType) {
                return false;
            }
        }
        return true;
    }

    function uri(
        uint256 _tokenid
    ) public pure override returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "https://nftstorage.link/ipfs/bafybeiakrmpdau6mik5z6dcm7szaejb4w6ml5u7minenmfiegv6c7hehwi/",
                    Strings.toString(_tokenid),
                    ".json"
                )
            );
    }
}
