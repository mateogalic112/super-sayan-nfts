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
          "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          SuperSayan.abi,
          signer
        );
        console.log({ contract: (await contract.tokenIds()).toNumber() });

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
