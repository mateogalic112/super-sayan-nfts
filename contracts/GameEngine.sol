// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract GameEngine is Initializable {
    address private admin;

    function initialize(address _admin) public initializer {
        admin = _admin;
    }

    function getAdmin() public view returns (address) {
        return admin;
    }

    function retrievePrice() public pure returns (uint256) {
        uint256 price = 100;
        return price;
    }
}
