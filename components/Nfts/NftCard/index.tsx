"use-client";

import Image from "next/image";
import useFetchNft from "../hooks/useFetchNft";
import classes from "./index.module.scss";

interface Props {
  tokenId: number;
}

const NftCard = ({ tokenId }: Props) => {
  const nft = useFetchNft(tokenId);
  console.log({ nft });

  if (!nft) return null;

  return (
    <div className={classes.nftCard}>
      <h1 className={classes.title}>{nft.name}</h1>
      <p className={classes.subtitle}>{nft.description}</p>
      <Image
        src={nft.image}
        width={100}
        height={120}
        alt={nft.name}
        className={classes.nftImage}
      />

      <ul className={classes.attributes}>
        {nft.attributes.map((attribute) => (
          <li className={classes.attribute}>
            <p className={classes.trait}>{attribute.trait_type}:</p>
            <p className={classes.value}>{attribute.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NftCard;
