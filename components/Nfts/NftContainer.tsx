"use-client";

import { ethers } from "ethers";
import { useEffect, useState } from "react";
import SuperSayan from "../../artifacts/contracts/SuperSayanNFT.sol/SuperSayanNFT.json";
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
