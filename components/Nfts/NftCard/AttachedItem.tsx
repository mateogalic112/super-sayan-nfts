import Image from "next/image";
import useGetInventoryItem from "../../Inventory/hooks/useGetInventoryItem";

interface Props {
  tokenId: number;
}

const AttachedItem = ({ tokenId }: Props) => {
  const { data: weapon } = useGetInventoryItem(tokenId);

  if (!weapon) return null;

  return (
    <div>
      <Image src={weapon.image} width={100} height={30} alt={weapon.name} />
    </div>
  );
};

export default AttachedItem;
