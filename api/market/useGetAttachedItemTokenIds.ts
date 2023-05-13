import { BigNumber, ethers } from "ethers";
import { useQuery } from "react-query";
import { useWeb3Context } from "../../context";
import { getGameEngineContract } from "../../services/contracts/getGameEngineContract";
import { ATTACHED_ITEM_TOKEN_IDS } from "./queryKeys";

const useGetAttachedItemTokenIds = (tokenId: number) => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const getAttachedItems = async (): Promise<BigNumber[] | undefined> => {
    try {
      const gameEngineContract = getGameEngineContract(safeSigner);
      const items = await gameEngineContract.getAttachedItemsToSayan(tokenId);
      return items;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  return useQuery([ATTACHED_ITEM_TOKEN_IDS], getAttachedItems, {
    enabled: !!safeSigner && !!tokenId,
  });
};

export default useGetAttachedItemTokenIds;
