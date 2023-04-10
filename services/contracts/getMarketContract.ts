import Market from "../../artifacts/contracts/Market.sol/Market.json";
import web3Constants from "../../constants/web3";
import { ethers } from "ethers";

export const getMarketContract = (signer: ethers.providers.JsonRpcSigner) => {
  const marketContract = new ethers.Contract(
    web3Constants.MARKET_CONTRACT_ADDRESS,
    Market.abi,
    signer
  );

  return marketContract;
};
