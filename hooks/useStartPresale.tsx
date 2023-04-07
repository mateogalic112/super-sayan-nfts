import { useWeb3Context } from "../context";
import SuperSayan from "../artifacts/contracts/SuperSayanNFT.sol/SuperSayanNFT.json";
import web3Constants from "../constants/web3";
import { ethers } from "ethers";
import { useState } from "react";

const useStartPresale = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const [isLoading, setIsLoading] = useState(false);

  const startPresale = async () => {
    try {
      const nftContract = new ethers.Contract(
        web3Constants.SUPERSAYAN_CONTRACT_ADDRESS,
        SuperSayan.abi,
        safeSigner
      );
      const tx = await nftContract.startPresale();
      setIsLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      // TODO set the presale started to true
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, startPresale };
};

export default useStartPresale;
