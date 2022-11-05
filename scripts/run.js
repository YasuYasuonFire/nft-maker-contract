// run.js
const main = async () => {
    // コントラクトがコンパイルします
    // コントラクトを扱うために必要なファイルが `artifacts` ディレクトリの直下に生成されます。
    const nftContractFactory = await hre.ethers.getContractFactory("Web3Mint");
    // Hardhat がローカルの Ethereum ネットワークを作成します。
    const nftContract = await nftContractFactory.deploy();
    // コントラクトが Mint され、ローカルのブロックチェーンにデプロイされるまで待ちます。
    await nftContract.deployed();
    console.log("Contract deployed to:", nftContract.address);

    //let txn = await nftContract.mintIpfsNFT("poker","I eat an apple","bafybeiejmba4ox3fi3v574pgxg3nfaeqw5fz5tcmvdf5iwyykuha3mufd4/2010-11-28 23.31.01.JPG");
    let txn = await nftContract.mintIpfsNFT("https://bafybeih2ydzf3mrn4w6bhqiuwkkfcmik45k3m4yrc4uokap3vp6pf7nitq.ipfs.w3s.link/test_metadata.json");
    await txn.wait();
    let returnedTokenUri = await nftContract.tokenURI(0);
    console.log("tokenURI:",returnedTokenUri);

    let txn2 = await nftContract.mintIpfsNFT("https://bafybeih2ydzf3mrn4w6bhqiuwkkfcmik45k3m4yrc4uokap3vp6pf7nitq.ipfs.w3s.link/test_metadata.json");
    await txn2.wait();
    let returnedTokenUri2 = await nftContract.tokenURI(0);
    console.log("tokenURI:",returnedTokenUri2);

    let latestId = await nftContract.getLatestId();
    console.log("latest ID: ", latestId);
  };
  // エラー処理を行っています。
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };

  runMain();