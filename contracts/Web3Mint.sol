// Web3Mint.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

//OpenZeppelinが提供するヘルパー機能をインポートします。
import "@openzeppelin/contracts/utils/Counters.sol";

//import "./libraries/Base64.sol";
import "hardhat/console.sol";
contract Web3Mint is ERC721{
    struct NftAttributes{
        string metadataURI;
    }

    NftAttributes[] Web3Nfts;

    using Counters for Counters.Counter;
    // tokenIdはNFTの一意な識別子で、0, 1, 2, .. N のように付与されます。
    Counters.Counter private _tokenIds;

    constructor() ERC721("HakanaiNFT","HKNI"){
        console.log("This is my NFT contract.");
    }

    // ユーザーが NFT を取得するために実行する関数です。

    function mintIpfsNFT(string memory metadataURI) public{
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender,newItemId);
        Web3Nfts.push(NftAttributes({
            metadataURI: metadataURI
        }));
        console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
        _tokenIds.increment();
    }
    function tokenURI(uint256 _tokenId) public override view returns(string memory){
        string memory output = Web3Nfts[_tokenId].metadataURI;
        return output;
    }
}