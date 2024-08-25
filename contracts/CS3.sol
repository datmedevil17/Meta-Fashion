// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CS3 is ERC1155, Ownable {
    uint256 public nextTokenId;
    uint256 public constant listingFee = 0.01 ether;

    struct Design {
        uint256 tokenId;
        string name;
        string category;
        address payable creator;
        uint256 price;
        uint256 royalty;
        bool isListed;
        string imageURI;
    }

    mapping(uint256 => Design) public designs;
    mapping(address => uint256[]) public ownedDesigns;

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
        string memory _imageURI
    ) external {
        require(bytes(_name).length > 0, "Name required");
        require(bytes(_category).length > 0, "Category required");
        require(_price > 0, "Price must be greater than zero");
        require(_amount > 0, "Amount must be greater than zero");

        uint256 tokenId = nextTokenId++;
        _mint(msg.sender, tokenId, _amount, "");

        designs[tokenId] = Design({
            tokenId: tokenId,
            name: _name,
            category: _category,
            creator: payable(msg.sender),
            price: _price,
            royalty: _royalty,
            isListed: true,
            imageURI: _imageURI
        });

        emit DesignUploaded(tokenId, msg.sender, _name, _category, _price, _amount, _royalty, _imageURI);
    }

    function buyDesign(uint256 _tokenId, uint256 _amount) external payable {
        Design storage design = designs[_tokenId];
        require(design.isListed, "Design not available for sale");
        require(balanceOf(design.creator, _tokenId) >= _amount, "Not enough designs available");

        uint256 totalPrice = design.price  ;
        uint256 royaltyAmount = totalPrice;
        uint256 sellerProceeds = 0;
        if(msg.value >= royaltyAmount ) {
        sellerProceeds = msg.value - royaltyAmount;
        } 

        _safeTransferFrom(design.creator, msg.sender, _tokenId, _amount, "");

        if (balanceOf(design.creator, _tokenId) == 0) {
            design.isListed = false;
        }

        design.creator.transfer(royaltyAmount);
        payable(owner()).transfer(sellerProceeds);

        ownedDesigns[msg.sender].push(_tokenId);

        emit DesignBought(_tokenId, msg.sender, design.creator, design.price);
    }

    function myPersonalWardrobe() external view returns (Design[] memory) {
        uint256[] memory ownedTokenIds = ownedDesigns[msg.sender];
        Design[] memory wardrobe = new Design[](ownedTokenIds.length);

        for (uint256 i = 0; i < ownedTokenIds.length; i++) {
            wardrobe[i] = designs[ownedTokenIds[i]];
        }
        return wardrobe;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No Ether available for withdrawal");
        payable(owner()).transfer(balance);
    }
}
