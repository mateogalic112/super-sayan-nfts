import { useWeb3Context } from "../context";
import SuperSayan from "../artifacts/contracts/SuperSayanNFT.sol/SuperSayanNFT.json";
import web3Constants from "../constants/web3";
import { ethers } from "ethers";
import { useState } from "react";

const usePublicMint = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const [isLoading, setIsLoading] = useState(false);

  const publicMint = async () => {
    try {
      const nftContract = new ethers.Contract(
        web3Constants.SUPERSAYAN_CONTRACT_ADDRESS,
        SuperSayan.abi,
        safeSigner
      );
      const tx = await nftContract.mint({
        value: ethers.utils.parseEther("0.05"),
      });
      setIsLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      window.alert("You successfully minted a Super Sayan Token!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, publicMint };
};

export default usePublicMint;
