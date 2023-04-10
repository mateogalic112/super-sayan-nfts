import Image from "next/image";
import { useState } from "react";
import { Weapon } from "../../../models/Weapon";
import useBalanceOf from "../hooks/useBalanceOf";
import useMarketItemMetadata from "../hooks/useMarketItemMetadata";
import useMintMarketItem from "../hooks/useMintMarketItem";
import classes from "./index.module.scss";

interface Props {
  weapon: Weapon;
  tokenId: number;
}

const WeaponCard = ({ weapon, tokenId }: Props) => {
  const { data: balance } = useBalanceOf(tokenId);
  const { data: metadata } = useMarketItemMetadata(tokenId);

  const [amount, setAmount] = useState("0");
  const mintItem = useMintMarketItem();

  if (!metadata) return null;

  return (
    <div className={classes.weaponCard}>
      <h2 className={classes.title}>{weapon.name}</h2>
      <Image
        className={classes.image}
        src={weapon.image}
        width={60}
        height={100}
        alt={weapon.name}
      />
      <ul className={classes.weaponAttributes}>
        {weapon.attributes.map((attribute, idx) => (
          <li className={classes.attribute} key={idx}>
            <p>{attribute.trait_type}:</p>
            <p className={classes.value}>{attribute.value}</p>
          </li>
        ))}
      </ul>

      <p>Balance: {balance?.toString()}</p>

      <input value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button
        disabled={!amount || parseInt(amount) <= 0}
        onClick={() =>
          mintItem.mutateAsync({
            itemId: tokenId,
            amount: parseInt(amount),
            price: metadata.price,
          })
        }
      >
        Buy
      </button>
    </div>
  );
};

export default WeaponCard;
