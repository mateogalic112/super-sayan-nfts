import { ethers } from "ethers";
import { useQuery } from "react-query";
import { contractAddresses } from "constants/web3";
import { Weapon } from "models/Weapon";
import { useWeb3Context } from "context";
import Market from "artifacts/contracts/Market.sol/Market.json";

const MARKET_ITEMS = [1, 2, 3];

const fetchInventoryItems = async (
  contract: ethers.Contract
): Promise<Weapon[]> => {
  try {
    const promises = MARKET_ITEMS.map(async (item) => {
      const uri = await contract.uri(item);
      const res = await fetch(uri);
      if (!res.ok) {
        throw new Error(`Failed to fetch weapon with id ${1}`);
      }
      return res.json() as unknown as Weapon;
    });

    return Promise.all(promises);
  } catch (err) {
    console.error({ err });
    return [];
  }
};

export const useGetInventoryItems = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const marketContract = new ethers.Contract(
    contractAddresses.MARKET_CONTRACT_ADDRESS,
    Market.abi,
    safeSigner
  );

  return useQuery({
    queryKey: ["market"],
    queryFn: () => fetchInventoryItems(marketContract),
    enabled: !!signer,
    select: (weapons: Weapon[]) =>
      weapons.map((weapon) => ({ ...weapon, image: imagePath(weapon.image) })),
  });
};

const imagePath = (image: string) => {
  const basePath = "https://nftstorage.link/ipfs";
  const imagePath = image.split("//")[1];
  return `${basePath}/${imagePath}`;
};
