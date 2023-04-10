import Image from "next/image";
import useGetInventoryItem from "../../Inventory/hooks/useGetInventoryItem";
import useMarketItemMetadata from "../../Inventory/hooks/useMarketItemMetadata";

interface Props {
  tokenId: number;
}

const AttachedItem = ({ tokenId }: Props) => {
  const { data: weapon } = useGetInventoryItem(tokenId);
  const { data: metadata } = useMarketItemMetadata(tokenId);

  if (!weapon) return null;

  return (
    <div>
      <Image src={weapon.image} width={60} height={50} alt={weapon.name} />
    </div>
  );
};

export default AttachedItem;
