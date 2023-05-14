import { ethers, utils } from "ethers";
import { useQuery } from "react-query";
import { useWeb3Context } from "context";
import { BaseWeapon, ItemType, Weapon, WeaponMetadata } from "models/Weapon";
import { getMarketContract } from "services/contracts/getMarketContract";
import { MARKET_ITEM } from "./queryKeys";

interface Args {
  marketContract: ethers.Contract;
  tokenId: number;
}

export const getMarketItem = async ({
  marketContract,
  tokenId,
}: Args): Promise<Weapon> => {
  const [baseWeapon, weaponMetadata] = await Promise.all([
    getBaseWeapon({ marketContract, tokenId }),
    getWeaponMetadata({ marketContract, tokenId }),
  ]);

  return {
    ...baseWeapon,
    ...weaponMetadata,
    image: imagePath(baseWeapon.image),
  } as Weapon;
};

export const useGetMarketItem = (tokenId: number) => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;
  const marketContract = getMarketContract(safeSigner);

  return useQuery(
    [MARKET_ITEM, tokenId],
    () => getMarketItem({ marketContract, tokenId }),
    {
      enabled: !!tokenId && !!safeSigner,
    }
  );
};

const getBaseWeapon = async ({ marketContract, tokenId }: Args) => {
  const uri = await marketContract.uri(tokenId);
  const res = await fetch(uri);
  const baseWeapon = (await res.json()) as unknown as BaseWeapon;
  return baseWeapon;
};

const getWeaponMetadata = async ({ marketContract, tokenId }: Args) => {
  const weaponmMetadata = (await marketContract.getMarketItem(
    tokenId
  )) as WeaponMetadata;

  const parsedMetadata = {
    price: +utils.formatEther(weaponmMetadata.price),
    maxSupply: +weaponmMetadata.maxSupply,
    itemType: weaponmMetadata.itemType as ItemType,
  };

  return parsedMetadata;
};

const imagePath = (image: string) => {
  const basePath = "https://nftstorage.link/ipfs";
  const imagePath = image.split("//")[1];
  return `${basePath}/${imagePath}`;
};

export default useGetMarketItem;
