export interface Weapon {
  name: string;
  description: string;
  image: string;
  attributes: Attribute[];
}

interface Attribute {
  trait_type: string;
  value: string | number;
}

export enum ItemType {
  HAND,
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
