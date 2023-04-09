"use-client";

import Image from "next/image";
import useFetchNft from "./hooks/useFetchNft";

interface Props {
  tokenId: number;
}

const NftCard = ({ tokenId }: Props) => {
  const nft = useFetchNft(tokenId);

  if (!nft) return null;

  return (
    <div>
      <h1>{nft.name}</h1>
      <p>{nft.description}</p>
      <Image
        src={nft.image}
        width={100}
        height={120}
        alt={nft.name}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default NftCard;
