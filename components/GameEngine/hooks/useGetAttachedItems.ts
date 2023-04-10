import { useWeb3Context } from "../../../context";
import { ethers } from "ethers";
import { useQuery } from "react-query";
import { getGameEngineContract } from "../../../services/contracts/getGameEngineContract";

const useGetAttachedItems = (tokenId: number) => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const getAttachedItems = async () => {
    try {
      const gameEngineContract = getGameEngineContract(safeSigner);
      console.log({ gameEngineContract });

      const items = await gameEngineContract.getAttachedItemsToSayan(tokenId);
      return items;
    } catch (err) {
      console.error(err);
    }
  };

  return useQuery(["get-attached-items"], getAttachedItems, {
    enabled: !!safeSigner && !!tokenId,
  });
};

export default useGetAttachedItems;
