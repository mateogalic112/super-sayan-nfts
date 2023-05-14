export interface BaseWeapon {
  name: string;
  description: string;
  image: string;
  attributes: Attribute[];
}

export interface WeaponMetadata {
  price: number;
  maxSupply: number;
  itemType: ItemType;
}

export type Weapon = BaseWeapon & WeaponMetadata;

interface Attribute {
  trait_type: string;
  value: string | number;
}

export enum ItemType {
  LEFT_HAND,
  RIGHT_HAND,
  HEAD,
  BODY,
  LEGS,
}

export interface WeaponMetadata {
  price: number;
  maxSupply: number;
  itemType: ItemType;
}

export interface Slot {
  id: number;
  item?: Weapon;
}
