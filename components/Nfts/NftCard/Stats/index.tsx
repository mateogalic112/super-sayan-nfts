import { SuperSayan } from "../../../../models/SuperSayan";
import useStats from "./hooks/useStats";
import classes from "../index.module.scss";
import { Weapon } from "models/Weapon";

interface Props {
  nft: SuperSayan;
  attachedItems: Weapon[];
}

const Stats = ({ nft, attachedItems }: Props) => {
  const stats = useStats({ nft, attachedItems });

  if (!stats) return null;

  return (
    <ul className={classes.attributes}>
      {Object.keys(stats).map((key) => (
        <li key={key} className={classes.attribute}>
          <p className={classes.trait}>{key}:</p>
          <p className={classes.value}>{stats[key]}</p>
        </li>
      ))}
    </ul>
  );
};

export default Stats;
