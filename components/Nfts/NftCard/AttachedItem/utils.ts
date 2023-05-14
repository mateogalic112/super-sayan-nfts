import { Weapon } from "models/Weapon";

interface Args {
  weapon: Weapon;
}

export interface ParsedAttribute {
  label: string;
  value: string | number;
}

export const parseAttributes = ({ weapon }: Args): ParsedAttribute[] => {
  const parsedWeaponAttributes: ParsedAttribute[] = weapon.attributes.map(
    (attribute) => ({
      label: attribute.trait_type,
      value: attribute.value,
    })
  );

  const parsedMetadata: ParsedAttribute[] = [
    { label: "Max supply", value: weapon.maxSupply },
    { label: "Price", value: `${weapon.price} ETH` },
  ];

  return [...parsedWeaponAttributes, ...parsedMetadata];
};
