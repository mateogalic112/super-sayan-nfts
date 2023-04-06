// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IWhitelist.sol";

contract SuperSayanNFT is ERC721, ERC721Burnable, Ownable {
    string public baseUri;

    uint256 public constant TOKEN_MAX_SUPPLY = 7000;
    uint256 public tokenIds;
    uint88 public tokenPrice = 0.05 ether;
    mapping(address => uint256[]) myNfts;

    bool public _paused;
    bool public presaleStarted;
    uint256 public presaleEnded;

    modifier onlyWhenNotPaused {
        require(!_paused, "Contract paused");
        _;
    }

    IWhitelist whitelist;

    event Mint(address indexed to, uint256 indexed tokenId);

    constructor(string memory _baseUri, address whitelistContract) ERC721("SuperSayanNFT", "SSY") {
        baseUri = _baseUri;
        whitelist = IWhitelist(whitelistContract);
    }

    function startPresale() external onlyOwner {
        presaleStarted = true;
        presaleEnded = block.timestamp + 5 minutes;
    }

     function presaleMint() external payable onlyWhenNotPaused {
        require(presaleStarted && block.timestamp < presaleEnded, "Presale finished");
        require(whitelist.whitelistedAddresses(msg.sender), "Not whitelisted");
        require(tokenIds < TOKEN_MAX_SUPPLY, "No tokens left");
        require(msg.value >= tokenPrice, "Insufficient funds");

        tokenIds += 1;
        myNfts[msg.sender].push(tokenIds);
        _safeMint(msg.sender, tokenIds);
        emit Mint(msg.sender, tokenIds);
    }

    function mint() external payable {
        require(presaleStarted && block.timestamp >= presaleEnded, "Active presale");
        require(tokenIds < TOKEN_MAX_SUPPLY, "Exceed maximum supply");
        require(msg.value >= tokenPrice, "Not enough tokens sent");
        
        tokenIds += 1;
        myNfts[msg.sender].push(tokenIds);
        _safeMint(msg.sender, tokenIds);
        emit Mint(msg.sender, tokenIds);
    }

    function withdrawFunds() external onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) =  _owner.call{value: amount}("");
        require(sent, "Withdraw failed");
    }

    function fetchMyNfts() external view returns (uint256[] memory) {
        return myNfts[msg.sender];
    }

    function setPaused(bool val) external onlyOwner {
        _paused = val;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseUri;
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
