import Whitelist from "../../../artifacts/contracts/Whitelist.sol/Whitelist.json";
import web3Constants from "../../../constants/web3";
import { useWeb3Context } from "../../../context";
import { ethers } from "ethers";
import { useQuery } from "react-query";

const useGetNumAddressesWhitelisted = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const getNumAddressesWhitelisted = async () => {
    try {
      const contract = new ethers.Contract(
        web3Constants.WHITELIST_CONTRACT_ADDRESS,
        Whitelist.abi,
        safeSigner
      );

      const numAddressesWhitelisted = await contract.numAddressesWhitelisted();

      return numAddressesWhitelisted;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return useQuery(["num-addresses-whitelisted"], getNumAddressesWhitelisted);
};

export default useGetNumAddressesWhitelisted;
