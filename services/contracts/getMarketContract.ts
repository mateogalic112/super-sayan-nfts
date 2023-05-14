import Market from "artifacts/contracts/Market.sol/Market.json";
import { contractAddresses } from "constants/web3";
import { ethers } from "ethers";

export const getMarketContract = (signer: ethers.providers.JsonRpcSigner) => {
  const marketContract = new ethers.Contract(
    contractAddresses.MARKET_CONTRACT_ADDRESS,
    Market.abi,
    signer
  );

  return marketContract;
};
