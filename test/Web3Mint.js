// Web3Mint.js
const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Web3Mint",  () => {
    it("Should return the nft", async () => {
      const Mint = await ethers.getContractFactory("Web3Mint");
      const mintContract = await Mint.deploy();
      await mintContract.deployed();

      const [owner, addr1] = await ethers.getSigners();

      let nftName = 'poker'
      let ipfsCID = 'bafybeiejmba4ox3fi3v574pgxg3nfaeqw5fz5tcmvdf5iwyykuha3mufd4'

      await mintContract.connect(owner).mintIpfsNFT(nftName,ipfsCID) //0
      await mintContract.connect(addr1).mintIpfsNFT(nftName,ipfsCID) //1

      console.log(await mintContract.tokenURI(0))
      console.log(await mintContract.tokenURI(1))


    });
  });
