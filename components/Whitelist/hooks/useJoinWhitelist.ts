import { useWeb3Context } from "../../../context";
import { ethers } from "ethers";
import { useMutation, useQueryClient } from "react-query";
import { getWhitelistContract } from "../../../services/contracts/getWhitelistContract";

const useJoinWhitelist = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const queryClient = useQueryClient();

  const joinWhitelist = async () => {
    const whitelistContract = getWhitelistContract(safeSigner);
    try {
      const tx = await whitelistContract.addAddressToWhitelist({
        value: ethers.utils.parseEther("1"),
      });

      await tx.wait();
    } catch (err) {
      console.log({ err });
    }
  };

  return useMutation(joinWhitelist, {
    onSuccess: () => {
      queryClient.invalidateQueries(["num-addresses-whitelisted"]);
    },
  });
};

export default useJoinWhitelist;
