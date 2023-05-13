import { ethers } from "ethers";
import { useQuery } from "react-query";
import { useWeb3Context } from "../../context";
import { Weapon } from "../../models/Weapon";
import { getMarketItem } from "./useGetMarketItem";
import { getMarketContract } from "services/contracts/getMarketContract";

const MARKET_ITEMS = [1, 2, 3];

const fetchInventoryItems = async (
  marketContract: ethers.Contract
): Promise<Weapon[]> => {
  try {
    const promises = MARKET_ITEMS.map(async (tokenId) =>
      getMarketItem({ marketContract, tokenId })
    );

    return Promise.all(promises);
  } catch (err) {
    console.error({ err });
    return [];
  }
};

export const useGetInventoryItems = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;
  const marketContract = getMarketContract(safeSigner);

  return useQuery({
    queryKey: [MARKET_ITEMS],
    queryFn: () => fetchInventoryItems(marketContract),
    enabled: !!signer,
  });
};
