export interface Weapon {
  name: string;
  description: string;
  image: string;
  attributes: Attribute[];
}

interface Attribute {
  trait_type: string;
  value: string;
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
