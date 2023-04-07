import { useWeb3Context } from "../context";
import SuperSayan from "../artifacts/contracts/SuperSayanNFT.sol/SuperSayanNFT.json";
import web3Constants from "../constants/web3";
import { BigNumber, ethers } from "ethers";

const useTokenIdsMinted = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const getTokenIdsMinted = async () => {
    try {
      const nftContract = new ethers.Contract(
        web3Constants.SUPERSAYAN_CONTRACT_ADDRESS,
        SuperSayan.abi,
        safeSigner
      );
      const _tokenIds = await nftContract.tokenIds();
      return _tokenIds;
    } catch (err) {
      console.error(err);
      return BigNumber.from(0);
    }
  };

  return { getTokenIdsMinted };
};

export default useTokenIdsMinted;
