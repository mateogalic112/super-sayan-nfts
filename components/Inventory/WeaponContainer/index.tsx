"use-client";

import { useGetInventoryItems } from "../hooks/useGetInventoryItems";
import WeaponCard from "../WeaponCard";
import classes from "./index.module.scss";

const WeaponContainer = () => {
  const { data: weapons = [] } = useGetInventoryItems();

  return (
    <>
      <ul className={classes.weaponList}>
        {weapons.map((weapon, idx) => (
          <li className={classes.weaponItem} key={weapon.name}>
            <WeaponCard weapon={weapon} tokenId={idx + 1} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default WeaponContainer;
