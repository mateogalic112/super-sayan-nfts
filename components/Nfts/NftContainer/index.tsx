"use-client";

import NftCard from "../NftCard";
import useFetchMyNfts from "../hooks/useFetchMyNfts";
import classes from "./index.module.scss";

const NftContainer = () => {
  const { data: nfts } = useFetchMyNfts();

  return (
    <div>
      <ul className={classes.nftList}>
        {nfts?.map((nft) => (
          <li className={classes.nftItem} key={nft.toNumber()}>
            <NftCard tokenId={nft.toNumber()} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NftContainer;
