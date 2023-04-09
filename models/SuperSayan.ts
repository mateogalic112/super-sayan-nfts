export interface SuperSayan {
  attributes: NftAttribute[];
  description: string;
  image: string;
  name: string;
}

interface NftAttribute {
  trait_type: string;
  value: string | number;
}
