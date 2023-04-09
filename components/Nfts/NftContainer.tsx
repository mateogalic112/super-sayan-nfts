"use-client";

import NftCard from "./NftCard";
import useFetchMyNfts from "./hooks/useFetchMyNfts";

const NftContainer = () => {
  const { data: nfts } = useFetchMyNfts();

  return (
    <div>
      <ul>
        {nfts?.map((nft) => (
          <li key={nft.toNumber()}>
            <NftCard tokenId={nft.toNumber()} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NftContainer;
