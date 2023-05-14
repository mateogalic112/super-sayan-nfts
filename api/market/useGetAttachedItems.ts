import { useWeb3Context } from "context";
import { BigNumber, ethers } from "ethers";
import { Weapon } from "models/Weapon";
import { useQuery } from "react-query";
import { getGameEngineContract } from "services/contracts/getGameEngineContract";
import { getMarketContract } from "services/contracts/getMarketContract";
import { ATTACHED_ITEMS } from "./queryKeys";
import { getMarketItem } from "./useGetMarketItem";

interface Args {
  gameEngineContract: ethers.Contract;
  marketContract: ethers.Contract;
  sayanTokenId: number;
}

const getAttachedItems = async ({
  gameEngineContract,
  sayanTokenId,
  marketContract,
}: Args): Promise<Weapon[]> => {
  try {
    const attachedItemIds: BigNumber[] =
      await gameEngineContract.getAttachedItemsToSayan(sayanTokenId);

    const parsedAttachedItemIds = attachedItemIds.map((item) =>
      item.toNumber()
    );

    const promises = parsedAttachedItemIds.map(async (tokenId) =>
      getMarketItem({ marketContract, tokenId })
    );

    return Promise.all(promises);
  } catch (err) {
    console.error({ err });
    return [];
  }
};

const useGetAttachedItems = (tokenId: number) => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;
  const gameEngineContract = getGameEngineContract(safeSigner);
  const marketContract = getMarketContract(safeSigner);

  return useQuery(
    [ATTACHED_ITEMS, tokenId],
    () =>
      getAttachedItems({
        gameEngineContract,
        marketContract,
        sayanTokenId: tokenId,
      }),
    {
      enabled: !!safeSigner && !!tokenId,
    }
  );
};

export default useGetAttachedItems;
