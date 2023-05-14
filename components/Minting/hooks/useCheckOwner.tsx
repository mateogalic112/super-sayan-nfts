import { useWeb3Context } from "context";
import { ethers } from "ethers";
import { useQuery } from "react-query";
import { getNftContract } from "services/contracts/getNftContract";

const useCheckOwner = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const checkOwner = async () => {
    try {
      const nftContract = getNftContract(safeSigner);
      const _owner = await nftContract.owner();
      const address = await safeSigner.getAddress();
      if (address.toLowerCase() === _owner.toLowerCase()) {
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return useQuery(["check-owner"], checkOwner);
};

export default useCheckOwner;
