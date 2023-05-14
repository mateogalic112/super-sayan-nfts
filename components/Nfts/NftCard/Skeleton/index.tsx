import classes from "./index.module.scss";
import headIcon from "public/icons/head.svg";
import armIcon from "public/icons/arm.svg";
import bodyIcon from "public/icons/chest.svg";
import legIcon from "public/icons/leg.svg";
import Image from "next/image";
import classNames from "classnames";
import { ItemType, Weapon } from "models/Weapon";
import useAttachItemToSayan from "components/GameEngine/hooks/useAttachItemToSayan";
import AttachedItem from "../AttachedItem";
import { getSkeletonWeapons } from "./utils";
import { marketItemIds } from "constants/web3";

interface Props {
  tokenId: number;
  attachedItems: Weapon[];
}

const Skeleton = ({ tokenId, attachedItems }: Props) => {
  const attachItem = useAttachItemToSayan();

  const { headWeapon, leftArmWeapon, bodyWeapon, rightArmWeapon, legsWeapon } =
    getSkeletonWeapons(attachedItems);

  console.log({
    headWeapon,
    leftArmWeapon,
    bodyWeapon,
    rightArmWeapon,
    legsWeapon,
  });

  return (
    <div className={classes.skeleton}>
      <div className={classNames(classes.row, classes.headRow)}>
        <div className={classNames(classes.bodyPart, classes.head)}>
          {headWeapon ? (
            <AttachedItem weapon={headWeapon} />
          ) : (
            <Image
              src={headIcon}
              alt="head"
              width={32}
              height={32}
              onClick={() =>
                attachItem.mutateAsync({
                  tokenId,
                  weaponId: marketItemIds.HELMET,
                })
              }
              className={classes.imagePlaceholder}
            />
          )}
        </div>
      </div>
      <div className={classNames(classes.row, classes.bodyRow)}>
        <div className={classNames(classes.bodyPart, classes.leftArm)}>
          {leftArmWeapon ? (
            <AttachedItem weapon={leftArmWeapon} />
          ) : (
            <Image
              src={armIcon}
              alt="arm"
              width={32}
              height={32}
              className={classes.imagePlaceholder}
              onClick={() =>
                attachItem.mutateAsync({
                  tokenId,
                  weaponId: marketItemIds.SHIELD,
                })
              }
            />
          )}
        </div>
        <div className={classNames(classes.bodyPart, classes.body)}>
          {bodyWeapon ? (
            <AttachedItem weapon={bodyWeapon} />
          ) : (
            <Image
              src={bodyIcon}
              alt="body"
              width={32}
              height={32}
              className={classes.imagePlaceholder}
              onClick={() =>
                attachItem.mutateAsync({ tokenId, weaponId: ItemType.BODY })
              }
            />
          )}
        </div>
        <div className={classNames(classes.bodyPart, classes.rightArm)}>
          {rightArmWeapon ? (
            <AttachedItem weapon={rightArmWeapon} />
          ) : (
            <Image
              src={armIcon}
              alt="arm"
              width={32}
              height={32}
              className={classes.imagePlaceholder}
              onClick={() =>
                attachItem.mutateAsync({
                  tokenId,
                  weaponId: marketItemIds.SWORD,
                })
              }
            />
          )}
        </div>
      </div>
      <div className={classNames(classes.row, classes.legsRow)}>
        <div className={classNames(classes.bodyPart, classes.leftLeg)}>
          <Image
            src={legIcon}
            alt="leg"
            width={32}
            height={32}
            className={classes.imagePlaceholder}
            onClick={() =>
              attachItem.mutateAsync({ tokenId, weaponId: ItemType.LEGS })
            }
          />
        </div>
        <div className={classNames(classes.bodyPart, classes.rightLeg)}>
          <Image
            src={legIcon}
            alt="leg"
            width={32}
            height={32}
            className={classes.imagePlaceholder}
            onClick={() =>
              attachItem.mutateAsync({ tokenId, weaponId: ItemType.LEGS })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
