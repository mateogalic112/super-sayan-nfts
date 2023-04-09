import { ethers } from "ethers";
import { useMutation, useQueryClient } from "react-query";
import { useWeb3Context } from "../../../context";
import { getTokenContract } from "../../../services/contracts/getTokenContract";

const useClaimSuperSayanToken = () => {
  const queryClient = useQueryClient();

  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const claimSuperSayanToken = async () => {
    try {
      const tokenContract = getTokenContract(safeSigner);
      const tx = await tokenContract.claim();
      await tx.wait();
      window.alert("Sucessfully claimed Super Sayan Tokens");
    } catch (err) {
      console.error(err);
    }
  };

  return useMutation(claimSuperSayanToken, {
    onSuccess: () => {
      queryClient.invalidateQueries(["balance-of-super-sayan-tokens"]);
      queryClient.invalidateQueries(["tokens-to-be-claimed"]);
      queryClient.invalidateQueries(["total-tokens-minted"]);
    },
  });
};

export default useClaimSuperSayanToken;
