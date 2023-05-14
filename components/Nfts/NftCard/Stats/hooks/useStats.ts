import { SuperSayan } from "models/SuperSayan";
import { Weapon } from "models/Weapon";

interface Args {
  nft: SuperSayan | undefined;
  attachedItems: Weapon[];
}

const useStats = ({ nft, attachedItems }: Args) => {
  const stats = nft?.attributes
    .filter((attribute) => Number.isInteger(attribute.value))
    .reduce(
      (acc, attribute) => ({ ...acc, [attribute.trait_type]: attribute.value }),
      {}
    ) as { [key: string]: number };

  attachedItems.forEach((item) =>
    item.attributes.forEach((attribute) => {
      if (Number.isInteger(attribute.value)) {
        const safeAttributeValue = attribute.value as number;
        stats[attribute.trait_type] += safeAttributeValue;
      }
    })
  );

  return stats;
};

export default useStats;
