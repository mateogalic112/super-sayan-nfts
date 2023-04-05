"use-client";

import { useGetInventoryItems } from "./hooks/useGetInventoryItems";
import classes from "./index.module.scss";

const Inventory = () => {
  const { data: weapons = [] } = useGetInventoryItems();

  return (
    <ul className={classes.weaponList}>
      {weapons.map((weapon) => (
        <li className={classes.weaponItem}>
          <div>
            <p>{weapon.name}</p>
            <img src={weapon.image} width={100} height={100} />
          </div>
          <ul className={classes.weaponAttributes}>
            {weapon.attributes.map((attribute) => (
              <li className={classes.attribute}>
                <p>{attribute.trait_type}</p>
                <p>{attribute.value}</p>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default Inventory;
