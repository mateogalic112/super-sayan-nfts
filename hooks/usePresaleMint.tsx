import { useWeb3Context } from "../context";
import { ethers } from "ethers";
import { useState } from "react";
import { getNftContract } from "../services/contracts/getNftContract";
import { useMutation } from "react-query";

const usePresaleMint = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const [isLoading, setIsLoading] = useState(false);

  const presaleMint = async () => {
    try {
      const nftContract = getNftContract(safeSigner);
      const tx = await nftContract.presaleMint({
        value: ethers.utils.parseEther("0.025"),
      });
      await tx.wait();
      window.alert("You successfully minted a Super Sayan Token on presale!");
    } catch (err) {
      console.error(err);
    }
  };

  return useMutation(presaleMint);
};

export default usePresaleMint;
