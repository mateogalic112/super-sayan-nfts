"use-client";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import SuperSayan from "../artifacts/contracts/SuperSayanNFT.sol/SuperSayanNFT.json";
import NftCard from "./NftCard";
import web3Constants from "../constants/web3";

const NftContainer = () => {
  const [nfts, setNtfs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchNfts() {
      if (typeof window !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          web3Constants.SUPERSAYAN_CONTRACT_ADDRESS,
          SuperSayan.abi,
          signer
        );

        try {
          const nftsToSet = await contract.fetchMyNfts();
          setNtfs(nftsToSet);
        } catch (err) {
          console.log({ err });
        }
      }
    }
    fetchNfts();
  }, []);

  console.log({ nfts });

  return (
    <div>
      <ul>
        {nfts.map((nft) => (
          <li key={nft.toNumber()}>
            <NftCard tokenId={nft.toNumber()} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NftContainer;
