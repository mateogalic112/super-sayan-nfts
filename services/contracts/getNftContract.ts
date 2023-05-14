import SuperSayan from "artifacts/contracts/SuperSayanNFT.sol/SuperSayanNFT.json";
import { contractAddresses } from "constants/web3";
import { ethers } from "ethers";

export const getNftContract = (signer: ethers.providers.JsonRpcSigner) => {
  const nftContract = new ethers.Contract(
    contractAddresses.SUPERSAYAN_CONTRACT_ADDRESS,
    SuperSayan.abi,
    signer
  );

  return nftContract;
};
