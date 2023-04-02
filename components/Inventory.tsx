"use-client";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import web3Constants from "../constants/web3";
import Marekt from "../artifacts/contracts/Market.sol/Market.json";

const Inventory = () => {
  const [item, setItem] = useState<any>(null);
  const [item2, setItem2] = useState<any>(null);
  useEffect(() => {
    async function fetchItems() {
      if (typeof window !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          web3Constants.MARKET_CONTRACT_ADDRESS,
          Marekt.abi,
          signer
        );
        const result = await contract.balanceOf(
          "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
          1
        );
        const result2 = await contract.balanceOf(
          "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
          2
        );
        console.log({ result: result.toNumber() });
        console.log({ result2: result2.toNumber() });
        const itemMetadataResponse = await fetch(await contract.uri(1));
        const itemMetadataResponse2 = await fetch(await contract.uri(2));
        const itemMetadata = await itemMetadataResponse.json();
        const itemMetadata2 = await itemMetadataResponse2.json();
        console.log({ itemMetadata });
        console.log({ itemMetadata2 });
        setItem(itemMetadata);
        setItem2(itemMetadata2);
      }
    }
    fetchItems();
  }, []);

  if (!item) return null;

  const imagePath = (item: any) => {
    const basePath = "https://nftstorage.link/ipfs";
    const imagePath = item.image.split("//")[1];
    return `${basePath}/${imagePath}`;
  };

  return (
    <div>
      <ul>
        <li>
          <img src={imagePath(item)} width={200} height={100} />
        </li>
        <li>
          <img src={imagePath(item2)} width={200} height={100} />
        </li>
      </ul>
    </div>
  );
};

export default Inventory;
