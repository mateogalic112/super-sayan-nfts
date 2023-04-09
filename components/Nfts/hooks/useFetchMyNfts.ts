import { BigNumber, ethers } from "ethers";
import { useQuery } from "react-query";
import { useWeb3Context } from "../../../context";
import { getNftContract } from "../../../services/contracts/getNftContract";

const useFetchMyNfts = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const fetchMyNfts = async () => {
    try {
      const nftContract = getNftContract(safeSigner);
      const address = await safeSigner.getAddress();

      const balance = await nftContract.balanceOf(address);
      // balance is a Big number and thus we would compare it with Big number `zero`
      if (balance === BigNumber.from(0)) {
        return [];
      } else {
        // amount keeps track of the number of unclaimed tokens
        let ids = [];
        for (let i = 0; i < balance; i++) {
          const tokenId = await nftContract.tokenOfOwnerByIndex(address, i);
          ids.push(tokenId);
        }
        return ids;
      }
    } catch (err) {
      console.log({ err });
      return [];
    }
  };

  return useQuery(["fetch-my-nfts"], fetchMyNfts, {
    enabled: !!safeSigner,
  });
};

export default useFetchMyNfts;