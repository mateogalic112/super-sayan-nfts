import { ethers } from "ethers";
import { useQuery } from "react-query";
import { useWeb3Context } from "../../context";
import { Weapon } from "../../models/Weapon";
import { getMarketContract } from "../../services/contracts/getMarketContract";
import { MARKET_ITEM } from "./queryKeys";

export const useGetMarketItem = (tokenId: number) => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;
  const marketContract = getMarketContract(safeSigner);

  const getMarketItem = async (): Promise<Weapon | undefined> => {
    const uri = await marketContract.uri(tokenId);
    const res = await fetch(uri);
    const weapon = (await res.json()) as unknown as Weapon;
    return { ...weapon, image: imagePath(weapon.image) };
  };

  return useQuery([MARKET_ITEM, tokenId], getMarketItem, {
    enabled: !!tokenId && !!safeSigner,
  });
};

const imagePath = (image: string) => {
  const basePath = "https://nftstorage.link/ipfs";
  const imagePath = image.split("//")[1];
  return `${basePath}/${imagePath}`;
};

export default useGetMarketItem;
