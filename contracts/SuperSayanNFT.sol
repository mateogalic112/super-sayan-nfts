// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IWhitelist.sol";

contract SuperSayanNFT is ERC721Enumerable, Ownable {
    string public baseUri;

    uint256 public constant TOKEN_MAX_SUPPLY = 7000;
    uint256 public tokenIds;

    uint88 public presaleTokenPrice = 0.025 ether;
    uint88 public tokenPrice = 0.05 ether;

    bool public presaleStarted;
    uint256 public presaleEndsIn;

    bool public _paused;

    modifier onlyWhenNotPaused() {
        require(!_paused, "Contract paused");
        _;
    }

    IWhitelist whitelist;

    event Mint(address indexed to, uint256 indexed tokenId);

    constructor(
        string memory _baseUri,
        address whitelistContract
    ) ERC721("SuperSayanNFT", "SSY") {
        baseUri = _baseUri;
        whitelist = IWhitelist(whitelistContract);
        _mint(msg.sender, 1);
    }

    function startPresale() external onlyOwner {
        presaleStarted = true;
        presaleEndsIn = block.timestamp + 1 hours;
    }

    function presaleMint() external payable onlyWhenNotPaused {
        require(
            presaleStarted && block.timestamp < presaleEndsIn,
            "Presale finished"
        );
        require(whitelist.whitelistedAddresses(msg.sender), "Not whitelisted");
        require(tokenIds < TOKEN_MAX_SUPPLY, "No tokens left");
        require(msg.value >= presaleTokenPrice, "Insufficient funds");

        tokenIds += 1;
        _safeMint(msg.sender, tokenIds);

        emit Mint(msg.sender, tokenIds);
    }

    function mint() external payable {
        require(
            presaleStarted && block.timestamp >= presaleEndsIn,
            "Active presale"
        );
        require(tokenIds < TOKEN_MAX_SUPPLY, "Exceed maximum supply");
        require(msg.value >= tokenPrice, "Not enough tokens sent");

        tokenIds += 1;
        _safeMint(msg.sender, tokenIds);

        emit Mint(msg.sender, tokenIds);
    }

    function withdrawFunds() external onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) = _owner.call{value: amount}("");
        require(sent, "Withdraw failed");
    }

    function currentContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    function setPaused(bool val) external onlyOwner {
        _paused = val;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseUri;
    }

    receive() external payable {}

    fallback() external payable {}
}
