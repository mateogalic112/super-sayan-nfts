import GameEngine from "artifacts/contracts/GameEngine.sol/GameEngine.json";
import { contractAddresses } from "constants/web3";
import { ethers } from "ethers";

export const getGameEngineContract = (
  signer: ethers.providers.JsonRpcSigner
) => {
  const gameEngineContract = new ethers.Contract(
    contractAddresses.ENGINE_CONTRACT_ADDRESS,
    GameEngine.abi,
    signer
  );

  return gameEngineContract;
};
