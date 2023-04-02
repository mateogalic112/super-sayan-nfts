"use-client";
import { ethers } from "ethers";
import SuperSayan from "../artifacts/contracts/SuperSayanNFT.sol/SuperSayanNFT.json";
import web3Constants from "../constants/web3";

const MintButton = () => {
  let mintToken;
  if (typeof window !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      web3Constants.SUPERSAYAN_CONTRACT_ADDRESS,
      SuperSayan.abi,
      signer
    );

    mintToken = async () => {
      try {
        const tx = await contract.mint({
          value: ethers.utils.parseEther("0.05"),
        });

        await tx.wait();
      } catch (err) {
        console.log({ err });
      }
    };
  }

  return <button onClick={mintToken}>Mint</button>;
};

export default MintButton;
