export interface SuperSayan {
  attributes: [
    { trait_type: "Base"; value: string },
    { trait_type: "Personality"; value: string },
    { trait_type: "Stamina"; value: number },
    { trait_type: "Attack"; value: number },
    { trait_type: "Defense"; value: number }
  ];
  description: string;
  image: string;
  name: string;
}
