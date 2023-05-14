"use-client";

import Image from "next/image";
import useGetAttachedItems from "api/market/useGetAttachedItems";
import useFetchNft from "../hooks/useFetchNft";
import Skeleton from "./Skeleton";
import Stats from "./Stats";
import classes from "./index.module.scss";

interface Props {
  tokenId: number;
}

const NftCard = ({ tokenId }: Props) => {
  const { data: nft } = useFetchNft(tokenId);
  const { data: attachedItems } = useGetAttachedItems(tokenId);

  if (!nft || !attachedItems) return null;

  return (
    <div className={classes.nftCard}>
      <div className={classes.cardInfo}>
        <h1 className={classes.title}>{nft.name}</h1>
        <p className={classes.subtitle}>{nft.description}</p>
        <Image
          src={nft.image}
          width={100}
          height={120}
          alt={nft.name}
          className={classes.nftImage}
        />
      </div>

      <Stats nft={nft} attachedItems={attachedItems} />

      <Skeleton tokenId={tokenId} attachedItems={attachedItems} />
    </div>
  );
};

export default NftCard;
