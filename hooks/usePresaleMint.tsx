import { useWeb3Context } from "../context";
import SuperSayan from "../artifacts/contracts/SuperSayanNFT.sol/SuperSayanNFT.json";
import web3Constants from "../constants/web3";
import { ethers } from "ethers";
import { useState } from "react";

const usePresaleMint = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const [isLoading, setIsLoading] = useState(false);

  const presaleMint = async () => {
    try {
      const nftContract = new ethers.Contract(
        web3Constants.SUPERSAYAN_CONTRACT_ADDRESS,
        SuperSayan.abi,
        safeSigner
      );
      const tx = await nftContract.presaleMint({
        value: ethers.utils.parseEther("0.025"),
      });
      setIsLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      window.alert("You successfully minted a Super Sayan Token on presale!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, presaleMint };
};

export default usePresaleMint;
