import { BigNumber } from "ethers";
import { SuperSayan } from "../../../../models/SuperSayan";
import useStats from "../hooks/useStats";
import classes from "../index.module.scss";

interface Props {
  nft: SuperSayan;
  attachedItemTokenIds: BigNumber[];
}

const Stats = ({ nft, attachedItemTokenIds }: Props) => {
  const stats = useStats({ nft, attachedItemTokenIds });

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
