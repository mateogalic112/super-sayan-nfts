import useAttachItemToSayan from "../../../GameEngine/hooks/useAttachItemToSayan";
import classes from "../index.module.scss";

interface Props {
  tokenId: number;
}

const ActionContainer = ({ tokenId }: Props) => {
  const attachItem = useAttachItemToSayan();

  return (
    <div className={classes.btnContainer}>
      <button onClick={() => attachItem.mutateAsync({ tokenId, weaponId: 1 })}>
        Attach sword
      </button>
      <button onClick={() => attachItem.mutateAsync({ tokenId, weaponId: 2 })}>
        Attach shield
      </button>
      <button onClick={() => attachItem.mutateAsync({ tokenId, weaponId: 3 })}>
        Attach helmet
      </button>
    </div>
  );
};

export default ActionContainer;
