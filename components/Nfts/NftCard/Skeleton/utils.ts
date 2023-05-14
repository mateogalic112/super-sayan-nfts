import { ItemType, Weapon } from "models/Weapon";

export const getSkeletonWeapons = (attachedItems: Weapon[]) => {
  let headWeapon: Weapon | null = null;
  let leftArmWeapon: Weapon | null = null;
  let bodyWeapon: Weapon | null = null;
  let rightArmWeapon: Weapon | null = null;
  let legsWeapon: Weapon | null = null;

  attachedItems.forEach((item) => {
    switch (item.itemType) {
      case ItemType.HEAD:
        headWeapon = item;
        break;
      case ItemType.LEFT_HAND:
        leftArmWeapon = item;
        break;
      case ItemType.BODY:
        bodyWeapon = item;
        break;
      case ItemType.RIGHT_HAND:
        rightArmWeapon = item;
        break;
      case ItemType.LEGS:
        legsWeapon = item;
        break;
    }
  });

  return { headWeapon, leftArmWeapon, bodyWeapon, rightArmWeapon, legsWeapon };
};
