// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Mememachu is ERC721, Ownable {
    uint256 private _nextTokenId;
    uint256 public MINT_PRICE = 0.001 ether;
    uint256 public MAX_SUPPLY = 1000;

    constructor() ERC721("Mememachu", "PIKA") Ownable(msg.sender) {}

    function mint() public payable {
        require(msg.value >= MINT_PRICE, "Insufficient payment");
        require(_nextTokenId < MAX_SUPPLY, "Max supply reached");
        
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
} 