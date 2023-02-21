import { ethers } from "ethers";
import SuperSayan from "../artifacts/contracts/SuperSayanNFT.sol/SuperSayanNFT.json";
import MintButton from "../components/MintButton";
import NftContainer from "../components/NftContainer";

declare global {
  interface Window {
    ethereum: import("ethers").providers.ExternalProvider;
  }
}

function HomePage() {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <MintButton />
      <NftContainer />
    </div>
  );
}

export default HomePage;
