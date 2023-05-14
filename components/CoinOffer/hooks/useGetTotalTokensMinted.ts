import { BigNumber, ethers } from "ethers";
import { useQuery } from "react-query";
import { useWeb3Context } from "context";
import { getTokenContract } from "services/contracts/getTokenContract";

const useGetTotalTokensMinted = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const getTotalTokensMinted = async () => {
    try {
      const tokenContract = getTokenContract(safeSigner);
      const tokensMinted = await tokenContract.totalSupply();
      return tokensMinted;
    } catch (err) {
      console.error(err);
      return BigNumber.from("0");
    }
  };

  return useQuery(["total-tokens-minted"], getTotalTokensMinted);
};

export default useGetTotalTokensMinted;
