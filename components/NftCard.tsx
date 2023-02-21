"use-client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface Props {
  tokenId: number;
}

const NftCard = ({ tokenId }: Props) => {
  const [nft, setNft] = useState<any>(null);

  useEffect(() => {
    async function fetchNft() {
      const metadataUri = `https://nftstorage.link/ipfs/bafybeibeppt6l46borcfoinfzhavjjsvew7upenttai75yvmfxl3hmp7oy/${tokenId}.json`;
      const response = await fetch(metadataUri);
      setNft(await response.json());
    }
    fetchNft();
  }, [tokenId]);

  console.log({ nft });

  if (!nft) return null;

  const imagePath = () => {
    const basePath = "https://nftstorage.link/ipfs";
    const imagePath = nft.image.split("//")[1];
    return `${basePath}/${imagePath}`;
  };

  return (
    <div>
      <h1>{nft.name}</h1>
      <p>{nft.description}</p>
      <Image
        src={imagePath()}
        width={100}
        height={120}
        alt={nft.name}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default NftCard;
