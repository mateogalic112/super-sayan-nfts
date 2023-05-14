import SuperSayanToken from "artifacts/contracts/SuperSayanToken.sol/SuperSayanToken.json";
import { contractAddresses } from "constants/web3";
import { ethers } from "ethers";

export const getTokenContract = (signer: ethers.providers.JsonRpcSigner) => {
  const tokenContract = new ethers.Contract(
    contractAddresses.TOKEN_CONTRACT_ADDRESS,
    SuperSayanToken.abi,
    signer
  );

  return tokenContract;
};
