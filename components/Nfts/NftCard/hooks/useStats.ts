import { BigNumber, ethers } from "ethers";
import { useQueries } from "react-query";
import { useWeb3Context } from "../../../../context";
import { SuperSayan } from "../../../../models/SuperSayan";
import { Weapon } from "../../../../models/Weapon";
import { getMarketContract } from "../../../../services/contracts/getMarketContract";

interface Args {
  nft: SuperSayan | undefined;
  attachedItemTokenIds: BigNumber[];
}

const useStats = ({ nft, attachedItemTokenIds }: Args) => {
  const stats = nft?.attributes
    .filter((attribute) => Number.isInteger(attribute.value))
    .reduce(
      (acc, attribute) => ({ ...acc, [attribute.trait_type]: attribute.value }),
      {}
    ) as { [key: string]: number };

  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const getMarketItem = async (
    tokenId: number
  ): Promise<Weapon | undefined> => {
    const marketContract = getMarketContract(safeSigner);
    const uri = await marketContract.uri(tokenId);
    const res = await fetch(uri);
    const weapon = (await res.json()) as unknown as Weapon;
    return weapon;
  };

  const promises = attachedItemTokenIds.map((tokenId) => ({
    queryKey: ["inventory-item", tokenId.toNumber()],
    queryFn: async () => getMarketItem(tokenId.toNumber()),
  }));

  const results = useQueries(promises);

  const items = results
    .filter((result) => result.status === "success")
    .map((result) => result.data);

  items.forEach((item) =>
    item?.attributes.forEach((attribute) => {
      if (Number.isInteger(attribute.value)) {
        const safeAttributeValue = attribute.value as number;
        stats[attribute.trait_type] += safeAttributeValue;
      }
    })
  );

  return stats;
};

export default useStats;
