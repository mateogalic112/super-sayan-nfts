import SuperSayan from "../../artifacts/contracts/SuperSayanNFT.sol/SuperSayanNFT.json";
import web3Constants from "../../constants/web3";
import { ethers } from "ethers";

export const getNftContract = (signer: ethers.providers.JsonRpcSigner) => {
  const nftContract = new ethers.Contract(
    web3Constants.SUPERSAYAN_CONTRACT_ADDRESS,
    SuperSayan.abi,
    signer
  );

  return nftContract;
};
