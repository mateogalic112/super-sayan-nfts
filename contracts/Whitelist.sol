//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

contract Whitelist {
    uint8 public maxWhitelistedAddresses;
    uint8 public numAddressesWhitelisted;

    mapping(address => bool) public whitelistedAddresses;

    event Join(address indexed _address);

    constructor(uint8 _maxWhitelistedAddresses) {
        maxWhitelistedAddresses = _maxWhitelistedAddresses;
    }

    function addAddressToWhitelist() public payable {
        require(msg.value >= 1 ether, "Not enough funds sent!");
        require(!whitelistedAddresses[msg.sender], "Already whitelisted");
        require(
            numAddressesWhitelisted < maxWhitelistedAddresses,
            "Limit reached"
        );
        whitelistedAddresses[msg.sender] = true;
        numAddressesWhitelisted += 1;
        emit Join(msg.sender);
    }

    receive() external payable {}

    fallback() external payable {}
}
