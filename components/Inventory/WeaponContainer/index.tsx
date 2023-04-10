"use-client";

import useBalanceOf from "../hooks/useBalanceOf";
import { useGetInventoryItems } from "../hooks/useGetInventoryItems";
import WeaponCard from "../WeaponCard";
import classes from "./index.module.scss";

const WeaponContainer = () => {
  const { data: weapons = [] } = useGetInventoryItems();
  console.log({ weapons });

  const { data: balance } = useBalanceOf(1);
  console.log(balance?.toString());

  return (
    <ul className={classes.weaponList}>
      {weapons.map((weapon) => (
        <li className={classes.weaponItem} key={weapon.name}>
          <WeaponCard weapon={weapon} />
        </li>
      ))}
    </ul>
  );
};

export default WeaponContainer;
