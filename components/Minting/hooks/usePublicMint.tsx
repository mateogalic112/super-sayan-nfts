import { useWeb3Context } from "../../../context";
import { ethers } from "ethers";
import { useMutation } from "react-query";
import { getNftContract } from "../../../services/contracts/getNftContract";

const usePublicMint = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const publicMint = async () => {
    try {
      const nftContract = getNftContract(safeSigner);
      const tx = await nftContract.mint({
        value: ethers.utils.parseEther("0.05"),
      });
      await tx.wait();
      window.alert("You successfully minted a Super Sayan Token!");
    } catch (err) {
      console.error(err);
    }
  };

  return useMutation(publicMint);
};

export default usePublicMint;
