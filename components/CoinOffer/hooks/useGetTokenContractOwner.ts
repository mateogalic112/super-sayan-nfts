import { ethers } from "ethers";
import { useQuery } from "react-query";
import { useWeb3Context } from "context";
import { getTokenContract } from "services/contracts/getTokenContract";

const useGetTokenContractOwner = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const getTokenContractOwner = async () => {
    try {
      const tokenContract = getTokenContract(safeSigner);
      const _owner = await tokenContract.owner();
      const address = await safeSigner.getAddress();
      if (address.toLowerCase() === _owner.toLowerCase()) {
        return true;
      }
      return false;
    } catch (err) {
      console.error({ err });
      return false;
    }
  };
  return useQuery(["get-token-contract-owner"], getTokenContractOwner);
};

export default useGetTokenContractOwner;
