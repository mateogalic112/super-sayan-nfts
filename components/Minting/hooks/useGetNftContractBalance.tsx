import { useWeb3Context } from "../../../context";
import { BigNumber, ethers } from "ethers";
import { getNftContract } from "../../../services/contracts/getNftContract";
import { useQuery } from "react-query";

const useGetNftContractBalance = (isOwner: boolean | undefined) => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const getContractBalance = async () => {
    try {
      const nftContract = getNftContract(safeSigner);
      const balance = await nftContract.currentContractBalance();
      return balance;
    } catch (err) {
      console.error(err);
      return BigNumber.from(0);
    }
  };

  return useQuery(["contract-balance"], getContractBalance, {
    enabled: Boolean(isOwner),
  });
};

export default useGetNftContractBalance;
