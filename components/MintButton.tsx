"use-client";
import { ethers } from "ethers";
import SuperSayan from "../artifacts/contracts/SuperSayanNFT.sol/SuperSayanNFT.json";
import web3Constants from "../constants/web3";
import { useWeb3Context } from "../context";

const MintButton = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const contract = new ethers.Contract(
    web3Constants.SUPERSAYAN_CONTRACT_ADDRESS,
    SuperSayan.abi,
    safeSigner
  );

  const mintToken = async () => {
    try {
      const tx = await contract.mint({
        value: ethers.utils.parseEther("0.05"),
      });

      await tx.wait();
    } catch (err) {
      console.log({ err });
    }
  };

  return <button onClick={mintToken}>Mint</button>;
};

export default MintButton;
