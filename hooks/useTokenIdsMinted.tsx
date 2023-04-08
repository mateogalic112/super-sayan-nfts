import { useWeb3Context } from "../context";
import { BigNumber, ethers } from "ethers";
import { getNftContract } from "../services/contracts/getNftContract";
import { useQuery } from "react-query";

const useTokenIdsMinted = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const getTokenIdsMinted = async () => {
    try {
      const nftContract = getNftContract(safeSigner);
      const tokenIds = await nftContract.tokenIds();
      return tokenIds;
    } catch (err) {
      console.error(err);
      return BigNumber.from(0);
    }
  };

  return useQuery(["token-ids-minted"], getTokenIdsMinted, {
    refetchInterval: 5000,
  });
};

export default useTokenIdsMinted;
