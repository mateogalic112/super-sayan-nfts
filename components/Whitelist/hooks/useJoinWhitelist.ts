import { useWeb3Context } from "../../../context";
import Whitelist from "../../../artifacts/contracts/Whitelist.sol/Whitelist.json";
import web3Constants from "../../../constants/web3";
import { ethers } from "ethers";
import { useMutation } from "react-query";

const useJoinWhitelist = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const contract = new ethers.Contract(
    web3Constants.WHITELIST_CONTRACT_ADDRESS,
    Whitelist.abi,
    safeSigner
  );

  const joinWhitelist = async () => {
    try {
      const tx = await contract.addAddressToWhitelist({
        value: ethers.utils.parseEther("1"),
      });

      await tx.wait();
    } catch (err) {
      console.log({ err });
    }
  };

  return useMutation(joinWhitelist);
};

export default useJoinWhitelist;
