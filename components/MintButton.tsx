"use-client";
import { ethers } from "ethers";
import SuperSayan from "../artifacts/contracts/SuperSayanNFT.sol/SuperSayanNFT.json";

const MintButton = () => {
  let mintToken;
  if (typeof window !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      SuperSayan.abi,
      signer
    );

    mintToken = async () => {
      try {
        const result = await contract.mint({
          value: ethers.utils.parseEther("0.05"),
        });

        await result.wait();
      } catch (err) {
        console.log({ err });
      }
    };
  }

  return <button onClick={mintToken}>Mint</button>;
};

export default MintButton;
