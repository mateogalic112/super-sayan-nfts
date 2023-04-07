import { useWeb3Context } from "../context";
import SuperSayan from "../artifacts/contracts/SuperSayanNFT.sol/SuperSayanNFT.json";
import web3Constants from "../constants/web3";
import { BigNumber, ethers } from "ethers";

const useGetNftContractBalance = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const getContractBalance = async () => {
    try {
      const nftContract = new ethers.Contract(
        web3Constants.SUPERSAYAN_CONTRACT_ADDRESS,
        SuperSayan.abi,
        safeSigner
      );
      const balance = await nftContract.currentContractBalance();
      return balance;
    } catch (err) {
      console.error(err);
      return BigNumber.from(0);
    }
  };

  return { getContractBalance };
};

export default useGetNftContractBalance;
