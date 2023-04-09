import SuperSayanToken from "../../artifacts/contracts/SuperSayanToken.sol/SuperSayanToken.json";
import web3Constants from "../../constants/web3";
import { ethers } from "ethers";

export const getTokenContract = (signer: ethers.providers.JsonRpcSigner) => {
  const tokenContract = new ethers.Contract(
    web3Constants.TOKEN_CONTRACT_ADDRESS,
    SuperSayanToken.abi,
    signer
  );

  return tokenContract;
};
