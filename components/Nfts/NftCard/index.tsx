"use-client";

import Image from "next/image";
import useAttachItemToSayan from "../../GameEngine/hooks/useAttachItemToSayan";
import useGetAttachedItems from "../../GameEngine/hooks/useGetAttachedItems";
import useFetchNft from "../hooks/useFetchNft";
import AttachedItem from "./AttachedItem";
import classes from "./index.module.scss";

interface Props {
  tokenId: number;
}

const NftCard = ({ tokenId }: Props) => {
  const { data: nft } = useFetchNft(tokenId);

  const { data: attachedItems = [] } = useGetAttachedItems(tokenId);
  const attachItem = useAttachItemToSayan();

  console.log({ nft });
  console.log({ attachedItems });

  if (!nft) return null;

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

        <ul className={classes.attributes}>
          {nft.attributes.map((attribute) => (
            <li key={attribute.trait_type} className={classes.attribute}>
              <p className={classes.trait}>{attribute.trait_type}:</p>
              <p className={classes.value}>{attribute.value}</p>
            </li>
          ))}
        </ul>

        <div className={classes.btnContainer}>
          <button
            onClick={() => attachItem.mutateAsync({ tokenId, weaponId: 1 })}
          >
            Attach sword
          </button>
          <button
            onClick={() => attachItem.mutateAsync({ tokenId, weaponId: 2 })}
          >
            Attach shield
          </button>
          <button
            onClick={() => attachItem.mutateAsync({ tokenId, weaponId: 3 })}
          >
            Attach helmet
          </button>
        </div>
      </div>

      <div className={classes.actionContainer}>
        <ul className={classes.weaponList}>
          {attachedItems.map((item: any) => (
            <li key={item.toString()} className={classes.weapon}>
              <AttachedItem key={item.toString()} tokenId={item.toNumber()} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NftCard;
