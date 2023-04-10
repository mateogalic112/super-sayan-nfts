// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IMarket {
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external;

    function setApprovalForAll(address operator, bool approved) external;

    function balanceOf(
        address account,
        uint256 id
    ) external view returns (uint256);
}
