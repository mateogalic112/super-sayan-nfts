"use-client";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import SuperSayan from "../artifacts/contracts/SuperSayanNFT.sol/SuperSayanNFT.json";
import NftCard from "./NftCard";

const NftContainer = () => {
  const [nfts, setNtfs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchNfts() {
      if (typeof window !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
          SuperSayan.abi,
          signer
        );

        setNtfs(await contract.fetchMyNfts());
      }
    }
    fetchNfts();
  }, []);

  console.log({ nfts });

  return (
    <div>
      <ul>
        {nfts.map((nft) => (
          <li>
            <NftCard tokenId={nft.toNumber()} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NftContainer;
