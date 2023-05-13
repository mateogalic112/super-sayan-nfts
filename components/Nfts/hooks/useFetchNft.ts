import { useQuery } from "react-query";
import { SuperSayan } from "../../../models/SuperSayan";

const useFetchNft = (tokenId: number) => {
  const fetchNft = async (): Promise<SuperSayan> => {
    const metadataUri = `https://nftstorage.link/ipfs/bafybeibeppt6l46borcfoinfzhavjjsvew7upenttai75yvmfxl3hmp7oy/${tokenId}.json`;
    const response = await fetch(metadataUri);
    const rawNft = await response.json();

    const parsedNft = { ...rawNft, image: imagePath(rawNft.image) };
    return parsedNft;
  };

  const imagePath = (image: string) => {
    const basePath = "https://nftstorage.link/ipfs";
    const imagePath = image.split("//")[1];
    return `${basePath}/${imagePath}`;
  };

  return useQuery(["nft", tokenId], fetchNft, {
    enabled: Number.isInteger(tokenId),
  });
};

export default useFetchNft;
