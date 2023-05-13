import { Weapon, WeaponMetadata } from "../../../../models/Weapon";

interface Args {
  weapon: Weapon;
  metadata: WeaponMetadata;
}

export interface ParsedAttribute {
  label: string;
  value: string | number;
}

export const parseAttributes = ({
  weapon,
  metadata,
}: Args): ParsedAttribute[] => {
  const parsedWeaponAttributes: ParsedAttribute[] = weapon.attributes.map(
    (attribute) => ({
      label: attribute.trait_type,
      value: attribute.value,
    })
  );

  const parsedMetadata: ParsedAttribute[] = [
    { label: "Max supply", value: metadata.maxSupply },
    { label: "Price", value: `${metadata.price} ETH` },
  ];

  return [...parsedWeaponAttributes, ...parsedMetadata];
};
