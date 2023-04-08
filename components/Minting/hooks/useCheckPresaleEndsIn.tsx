import { useWeb3Context } from "../../../context";
import { ethers } from "ethers";
import { useQuery } from "react-query";
import { getNftContract } from "../../../services/contracts/getNftContract";

const useCheckPresaleEndsIn = (presaleStarted: unknown) => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const getPresaleEndsIn = async () => {
    try {
      const nftContract = getNftContract(safeSigner);
      const presaleEndsIn = await nftContract.presaleEndsIn();
      return presaleEndsIn;
    } catch (err) {
      console.error(err);
    }
  };

  return useQuery(["presale-ends-in"], getPresaleEndsIn, {
    enabled: Boolean(presaleStarted),
  });
};

export default useCheckPresaleEndsIn;
