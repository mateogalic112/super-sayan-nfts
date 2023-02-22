"use-client";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Marekt from "../artifacts/contracts/Market.sol/Market.json";

const Inventory = () => {
  useEffect(() => {
    async function fetchItems() {
      if (typeof window !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
          Marekt.abi,
          signer
        );
        const result = await contract.balanceOf(
          "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          1
        );
        console.log({ result: result.toNumber() });
        const itemMetadataResponse = await fetch(await contract.uri(1));
        const itemMetadata = await itemMetadataResponse.json();
        console.log({ itemMetadata });
      }
    }
    fetchItems();
  }, []);

  return (
    <div>
      <ul></ul>
    </div>
  );
};

export default Inventory;
