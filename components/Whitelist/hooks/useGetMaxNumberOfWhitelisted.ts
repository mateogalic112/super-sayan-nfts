import Whitelist from "../../../artifacts/contracts/Whitelist.sol/Whitelist.json";
import web3Constants from "../../../constants/web3";
import { useWeb3Context } from "../../../context";
import { ethers } from "ethers";
import { useQuery } from "react-query";

const useGetMaxNumberOfWhitelisted = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const checkHasJoinedWhitelist = async () => {
    try {
      const contract = new ethers.Contract(
        web3Constants.WHITELIST_CONTRACT_ADDRESS,
        Whitelist.abi,
        safeSigner
      );

      const _maxNumberOfWhitelisted = await contract.maxWhitelistedAddresses();

      return _maxNumberOfWhitelisted;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return useQuery(["max-number-of-whitelisted"], checkHasJoinedWhitelist);
};

export default useGetMaxNumberOfWhitelisted;
