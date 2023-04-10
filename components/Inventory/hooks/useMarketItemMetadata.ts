import { useWeb3Context } from "../../../context";
import { ethers, utils } from "ethers";
import { useQuery } from "react-query";
import { getMarketContract } from "../../../services/contracts/getMarketContract";
import { ItemType, WeaponMetadata } from "../../../models/Weapon";

const useMarketItemMetadata = (tokenId: number) => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const getItemMetadata = async (): Promise<WeaponMetadata | undefined> => {
    try {
      const marketContract = getMarketContract(safeSigner);
      const metadata = await marketContract.getMarketItem(tokenId);
      const parsedMetadata = {
        price: +utils.formatEther(metadata.price),
        maxSupply: +metadata.maxSupply,
        itemType: metadata.itemType as ItemType,
      };
      return parsedMetadata;
    } catch (err) {
      console.error(err);
    }
  };

  return useQuery(["erc1155-item-metadata", tokenId], getItemMetadata, {
    enabled: !!tokenId && !!safeSigner,
  });
};

export default useMarketItemMetadata;
