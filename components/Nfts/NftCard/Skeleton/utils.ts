import { ItemType, Weapon } from "models/Weapon";

export const getSkeletonWeapons = (attachedItems: Weapon[]) => {
  const weaponOptions: { [key: string]: Weapon | null } = {
    headWeapon: null,
    leftArmWeapon: null,
    bodyWeapon: null,
    rightArmWeapon: null,
    legsWeapon: null,
  };

  attachedItems.forEach((item) => {
    switch (item.itemType) {
      case ItemType.HEAD:
        weaponOptions.headWeapon = item;
        break;
      case ItemType.LEFT_HAND:
        weaponOptions.leftArmWeapon = item;
        break;
      case ItemType.BODY:
        weaponOptions.bodyWeapon = item;
        break;
      case ItemType.RIGHT_HAND:
        weaponOptions.rightArmWeapon = item;
        break;
      case ItemType.LEGS:
        weaponOptions.legsWeapon = item;
        break;
    }
  });

  return weaponOptions;
};
