import { useEffect, useState } from "react";
import { SuperSayan } from "../../../models/SuperSayan";

const useFetchNft = (tokenId: number) => {
  const [nft, setNft] = useState<SuperSayan | null>(null);

  useEffect(() => {
    async function fetchNft() {
      const metadataUri = `https://nftstorage.link/ipfs/bafybeibeppt6l46borcfoinfzhavjjsvew7upenttai75yvmfxl3hmp7oy/${tokenId}.json`;
      const response = await fetch(metadataUri);
      const rawNft = await response.json();

      const parsedNft = { ...rawNft, image: imagePath(rawNft.image) };
      setNft(parsedNft);
    }
    fetchNft();
  }, [tokenId]);

  const imagePath = (image: string) => {
    const basePath = "https://nftstorage.link/ipfs";
    const imagePath = image.split("//")[1];
    return `${basePath}/${imagePath}`;
  };

  return nft;
};

export default useFetchNft;
