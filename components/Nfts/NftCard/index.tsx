"use-client";

import Image from "next/image";
import useGetAttachedItemTokenIds from "../../../api/market/useGetAttachedItemTokenIds";
import useFetchNft from "../hooks/useFetchNft";
import ActionContainer from "./ActionContainer";
import classes from "./index.module.scss";
import Stats from "./Stats";
import WeaponList from "./WeaponList";

interface Props {
  tokenId: number;
}

const NftCard = ({ tokenId }: Props) => {
  const { data: nft } = useFetchNft(tokenId);
  const { data: attachedItemTokenIds } = useGetAttachedItemTokenIds(tokenId);

  if (!nft || !attachedItemTokenIds) return null;

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

        <Stats nft={nft} attachedItemTokenIds={attachedItemTokenIds} />

        <ActionContainer tokenId={tokenId} />
      </div>

      <WeaponList attachedItemTokenIds={attachedItemTokenIds} />
    </div>
  );
};

export default NftCard;
