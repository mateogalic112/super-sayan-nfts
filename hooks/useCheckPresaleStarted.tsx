import { useWeb3Context } from "../context";
import SuperSayan from "../artifacts/contracts/SuperSayanNFT.sol/SuperSayanNFT.json";
import web3Constants from "../constants/web3";
import { ethers } from "ethers";
import { useState } from "react";

const useCheckPresaleStarted = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const checkPresaleStarted = async () => {
    try {
      const nftContract = new ethers.Contract(
        web3Constants.SUPERSAYAN_CONTRACT_ADDRESS,
        SuperSayan.abi,
        safeSigner
      );
      const _presaleStarted = await nftContract.presaleStarted();
      return _presaleStarted;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return { checkPresaleStarted };
};

export default useCheckPresaleStarted;
