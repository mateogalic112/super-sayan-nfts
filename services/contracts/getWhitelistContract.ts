import Whitelist from "../../artifacts/contracts/Whitelist.sol/Whitelist.json";
import web3Constants from "../../constants/web3";
import { ethers } from "ethers";

export const getWhitelistContract = (
  signer: ethers.providers.JsonRpcSigner
) => {
  const whitelistContract = new ethers.Contract(
    web3Constants.WHITELIST_CONTRACT_ADDRESS,
    Whitelist.abi,
    signer
  );

  return whitelistContract;
};
