import Image from "next/image";
import { Weapon } from "../../../models/Weapon";
import classes from "./index.module.scss";

interface Props {
  weapon: Weapon;
}

const WeaponCard = ({ weapon }: Props) => {
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
    </div>
  );
};

export default WeaponCard;
