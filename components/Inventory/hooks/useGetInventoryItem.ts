import { useWeb3Context } from "../../../context";
import { ethers } from "ethers";
import { useQuery } from "react-query";
import { getMarketContract } from "../../../services/contracts/getMarketContract";
import { Weapon } from "../../../models/Weapon";
import { MARKET_ITEM } from "../../../api/market/queryKeys";

const useGetInventoryItem = (tokenId: number) => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const getInventoryItem = async (): Promise<Weapon | undefined> => {
    try {
      const marketContract = getMarketContract(safeSigner);
      const uri = await marketContract.uri(tokenId);
      const res = await fetch(uri);
      const weapon = (await res.json()) as unknown as Weapon;
      return { ...weapon, image: imagePath(weapon.image) };
    } catch (err) {
      console.error(err);
    }
  };

  return useQuery([MARKET_ITEM, tokenId], getInventoryItem, {
    enabled: !!tokenId && !!safeSigner,
  });
};

const imagePath = (image: string) => {
  const basePath = "https://nftstorage.link/ipfs";
  const imagePath = image.split("//")[1];
  return `${basePath}/${imagePath}`;
};

export default useGetInventoryItem;
