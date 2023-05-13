import { BigNumber, ethers } from "ethers";
import { useQuery } from "react-query";
import { useWeb3Context } from "context";
import { getNftContract } from "services/contracts/getNftContract";
import { MY_NFT_TOKEN_IDS } from "./queryKeys";

const useGetMyNftTokenIds = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const getMyNftTokenIds = async () => {
    try {
      const nftContract = getNftContract(safeSigner);
      const address = await safeSigner.getAddress();

      const balance = await nftContract.balanceOf(address);
      // balance is a Big number and thus we would compare it with Big number `zero`
      if (balance === BigNumber.from(0)) {
        return [];
      }

      let ids = [];
      for (let i = 0; i < balance; i++) {
        const tokenId = await nftContract.tokenOfOwnerByIndex(address, i);
        ids.push(tokenId);
      }
      return ids;
    } catch (err) {
      console.log({ err });
      return [];
    }
  };

  return useQuery([MY_NFT_TOKEN_IDS], getMyNftTokenIds, {
    enabled: !!safeSigner,
  });
};

export default useGetMyNftTokenIds;
