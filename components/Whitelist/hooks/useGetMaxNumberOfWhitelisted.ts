import Whitelist from "artifacts/contracts/Whitelist.sol/Whitelist.json";
import { contractAddresses } from "constants/web3";
import { useWeb3Context } from "context";
import { ethers } from "ethers";
import { useQuery } from "react-query";

const useGetMaxNumberOfWhitelisted = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const getMaxWhitelistedAddresses = async () => {
    try {
      const contract = new ethers.Contract(
        contractAddresses.WHITELIST_CONTRACT_ADDRESS,
        Whitelist.abi,
        safeSigner
      );

      const maxWhitelistedAddresses = await contract.maxWhitelistedAddresses();
      return maxWhitelistedAddresses;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return useQuery(["max-whitelisted-addresses"], getMaxWhitelistedAddresses);
};

export default useGetMaxNumberOfWhitelisted;
