import { useWeb3Context } from "../context";
import SuperSayan from "../artifacts/contracts/SuperSayanNFT.sol/SuperSayanNFT.json";
import web3Constants from "../constants/web3";
import { ethers } from "ethers";

const useCheckPresaleEndsIn = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const getPresaleEndsIn = async () => {
    try {
      const nftContract = new ethers.Contract(
        web3Constants.SUPERSAYAN_CONTRACT_ADDRESS,
        SuperSayan.abi,
        safeSigner
      );
      const _presaleEndsIn = await nftContract.presaleEndsIn();
      return _presaleEndsIn;
    } catch (err) {
      console.error(err);
    }
  };

  return { getPresaleEndsIn };
};

export default useCheckPresaleEndsIn;
