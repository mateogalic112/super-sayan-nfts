import { BigNumber } from "ethers";
import AttachedItems from "../AttachedItems";
import classes from "../index.module.scss";

interface Props {
  attachedItemTokenIds: BigNumber[];
}

const WeaponList = ({ attachedItemTokenIds }: Props) => {
  return (
    <div className={classes.actionContainer}>
      <ul className={classes.weaponList}>
        {attachedItemTokenIds.map((item: any) => (
          <li key={item.toString()} className={classes.weapon}>
            <AttachedItems key={item.toString()} tokenId={item.toNumber()} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeaponList;
