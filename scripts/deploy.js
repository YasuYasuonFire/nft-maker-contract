const main = async () => {
    // コントラクトがコンパイルします
    // コントラクトを扱うために必要なファイルが `artifacts` ディレクトリの直下に生成されます。
    const nftContractFactory = await hre.ethers.getContractFactory("Web3Mint");
    // Hardhat がローカルの Ethereum ネットワークを作成します。
    const nftContract = await nftContractFactory.deploy();
    // コントラクトが Mint され、ローカルのブロックチェーンにデプロイされるまで待ちます。
    await nftContract.deployed();
    console.log("Contract deployed to:", nftContract.address);

    //let txn = await nftContract.mintIpfsNFT("https://bafybeih2ydzf3mrn4w6bhqiuwkkfcmik45k3m4yrc4uokap3vp6pf7nitq.ipfs.w3s.link/test_metadata.json");
    let txn = await nftContract.mintIpfsNFT("https://bafybeid6aoe2iebc6h43d2cq3pixiauuhgrxuew723frvihvhadw4f7lre.ipfs.w3s.link/meta.json","0x2382E6C9Cde357A3fA3ECdD255DefD3499e572F4");
    await txn.wait();
    let returnedTokenUri = await nftContract.tokenURI(0);
    console.log("tokenURI:",returnedTokenUri);
    returnedTokenUri = await nftContract.tokenURI(1);
    console.log("tokenURI:",returnedTokenUri);
    
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