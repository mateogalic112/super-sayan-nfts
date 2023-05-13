import { useWeb3Context } from "../../../context";
import { BigNumber, ethers } from "ethers";
import { useQuery } from "react-query";
import { getGameEngineContract } from "../../../services/contracts/getGameEngineContract";

const useGetAttachedItems = (tokenId: number) => {
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

  return useQuery(["attached-items"], getAttachedItems, {
    enabled: !!safeSigner && !!tokenId,
  });
};

export default useGetAttachedItems;
