import { BigNumber, ethers } from "ethers";
import { useQuery } from "react-query";
import { useWeb3Context } from "../../../context";
import { getTokenContract } from "../../../services/contracts/getTokenContract";

const useGetTokenMaxTotalSupply = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const getTokenMaxTotalSupply = async () => {
    try {
      const tokenContract = getTokenContract(safeSigner);
      const maxTotalSupply = await tokenContract.maxTotalSupply();
      return maxTotalSupply as BigNumber;
    } catch (err) {
      console.error(err);
      return BigNumber.from("0");
    }
  };

  return useQuery(["token-max-total-supply"], getTokenMaxTotalSupply);
};

export default useGetTokenMaxTotalSupply;
