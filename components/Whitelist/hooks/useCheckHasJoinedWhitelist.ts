import Whitelist from "../../../artifacts/contracts/Whitelist.sol/Whitelist.json";
import web3Constants from "../../../constants/web3";
import { useWeb3Context } from "../../../context";
import { ethers } from "ethers";
import { useQuery } from "react-query";

const useCheckHasJoinedWhitelist = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const checkHasJoinedWhitelist = async () => {
    try {
      const contract = new ethers.Contract(
        web3Constants.WHITELIST_CONTRACT_ADDRESS,
        Whitelist.abi,
        safeSigner
      );

      const hasJoinedWhitelist = await contract.whitelistedAddresses(
        safeSigner.getAddress()
      );

      return hasJoinedWhitelist;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return useQuery(["whitelisted-addresses"], checkHasJoinedWhitelist);
};

export default useCheckHasJoinedWhitelist;
