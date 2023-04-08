import { useWeb3Context } from "../context";
import { ethers } from "ethers";
import { useQuery } from "react-query";
import { getNftContract } from "../services/contracts/getNftContract";

const useCheckPresaleStarted = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const checkPresaleStarted = async (): Promise<boolean> => {
    try {
      const nftContract = getNftContract(safeSigner);
      const presaleStarted = await nftContract.presaleStarted();
      return presaleStarted;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return useQuery(["check-presale-started"], checkPresaleStarted);
};

export default useCheckPresaleStarted;
