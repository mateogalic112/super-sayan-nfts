"use-client";

import useGetMyNftTokenIds from "api/super-sayan-nft/useGetMyNftTokenIds";
import NftCard from "../NftCard";
import classes from "./index.module.scss";

const NftContainer = () => {
  const { data: nftTokenIds = [] } = useGetMyNftTokenIds();

  return (
    <ul className={classes.nftList}>
      {nftTokenIds.map((tokenId) => (
        <li className={classes.nftItem} key={tokenId.toNumber()}>
          <NftCard key={tokenId.toString()} tokenId={tokenId.toNumber()} />
        </li>
      ))}
    </ul>
  );
};

export default NftContainer;
