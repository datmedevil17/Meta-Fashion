// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ClothingStore is ERC1155, Ownable {
    uint256 public nextTokenId;
    uint256 public listingFee = 0.01 ether;

    mapping(uint256 => string) public productCategories;
    mapping(uint256 => Design) public designs;
    mapping(address => uint256[]) public ownedDesigns;

    struct Design {
        uint256 tokenId;
        string name;
        string category;
        address payable creator;
        uint256 price;
        uint256 royalty;
        bool isListed;
        string imageURI;  // New field to store the image URI
    }

    event DesignUploaded(
        uint256 indexed tokenId,
        address indexed creator,
        string name,
        string category,
        uint256 price,
        uint256 amount,
        uint256 royalty,
        string imageURI
    );
    event DesignBought(
        uint256 indexed tokenId,
        address indexed buyer,
        address indexed seller,
        uint256 price
    );

    constructor() ERC1155("") Ownable(msg.sender) {}

    function uploadDesign(
        string memory _name,
        string memory _category,
        uint256 _price,
        uint256 _amount,
        uint256 _royalty,
        string memory _imageURI  // New parameter for image URI
    ) public payable {
        require(msg.value >= listingFee, "Insufficient listing fee");

        uint256 tokenId = nextTokenId++;
        _mint(msg.sender, tokenId, _amount, "");
        designs[tokenId] = Design(
            tokenId, 
            _name, 
            _category, 
            payable(msg.sender), 
            _price, 
            _royalty, 
            true, 
            _imageURI  // Store the image URI
        );
        productCategories[tokenId] = _category;

        emit DesignUploaded(tokenId, msg.sender, _name, _category, _price, _amount, _royalty, _imageURI);
    }

    function buyDesign(uint256 _tokenId, uint256 _amount) public payable {
        Design storage design = designs[_tokenId];
        require(design.isListed, "Design not available for sale");
        require(msg.value >= design.price * _amount, "Insufficient Ether");
        require(balanceOf(design.creator, _tokenId) >= _amount, "Not enough designs available");

        address seller = design.creator;
        _safeTransferFrom(seller, msg.sender, _tokenId, _amount, "");

        design.isListed = balanceOf(seller, _tokenId) > 0;
        uint256 royaltyAmount = (msg.value * design.royalty) / 100;
        uint256 remainingAmount = msg.value - royaltyAmount;

        design.creator.transfer(royaltyAmount); // Royalty goes to the creator
        payable(owner()).transfer(remainingAmount); // Remaining amount goes to the contract owner

        ownedDesigns[msg.sender].push(_tokenId);

        emit DesignBought(_tokenId, msg.sender, seller, design.price);
    }

    function myPersonalWardrobe() public view returns (Design[] memory) {
        uint256[] memory ownedTokenIds = ownedDesigns[msg.sender];
        Design[] memory wardrobe = new Design[](ownedTokenIds.length);
        for (uint256 i = 0; i < ownedTokenIds.length; i++) {
            wardrobe[i] = designs[ownedTokenIds[i]];
        }
        return wardrobe;
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No Ether available for withdrawal");
        payable(owner()).transfer(balance);
    }
}
