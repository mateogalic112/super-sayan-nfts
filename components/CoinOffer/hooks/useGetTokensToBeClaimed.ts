import { BigNumber, ethers } from "ethers";
import { useQuery } from "react-query";
import { useWeb3Context } from "../../../context";
import { getNftContract } from "../../../services/contracts/getNftContract";
import { getTokenContract } from "../../../services/contracts/getTokenContract";

const useGetTokensToBeClaimed = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const getTokensToBeClaimed = async () => {
    const zero = BigNumber.from(0);

    try {
      const nftContract = getNftContract(safeSigner);
      const tokenContract = getTokenContract(safeSigner);

      const address = await safeSigner.getAddress();
      const balance = await nftContract.balanceOf(address);
      // balance is a Big number and thus we would compare it with Big number `zero`
      if (balance === zero) {
        return zero;
      } else {
        // amount keeps track of the number of unclaimed tokens
        let amount = 0;
        for (let i = 0; i < balance; i++) {
          const tokenId = await nftContract.tokenOfOwnerByIndex(address, i);
          const claimed = await tokenContract.tokenIdsClaimed(tokenId);
          if (!claimed) {
            amount++;
          }
        }
        //tokensToBeClaimed has been initialized to a Big Number, thus we would convert amount
        // to a big number and then set its value
        return BigNumber.from(amount);
      }
    } catch (err) {
      console.error({ err });
      return zero;
    }
  };

  return useQuery(["tokens-to-be-claimed"], getTokensToBeClaimed);
};

export default useGetTokensToBeClaimed;
