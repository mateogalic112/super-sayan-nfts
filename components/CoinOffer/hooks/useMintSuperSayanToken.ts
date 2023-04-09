import { ethers, utils } from "ethers";
import { useMutation, useQueryClient } from "react-query";
import { useWeb3Context } from "../../../context";
import { getTokenContract } from "../../../services/contracts/getTokenContract";

const useMintSuperSayanToken = () => {
  const queryClient = useQueryClient();

  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const mintSuperSayanToken = async (amount: string) => {
    const parsedAmount = +amount;

    try {
      const tokenContract = getTokenContract(safeSigner);

      const tokenPrice = await tokenContract.tokenPrice();
      const parsedTokenPrice = +utils.formatEther(tokenPrice).toString();

      const value = parsedTokenPrice * parsedAmount;
      const tx = await tokenContract.mint(parsedAmount, {
        value: utils.parseEther(value.toString()),
      });
      await tx.wait();
      window.alert("Successfully minted Super Sayan Tokens");
      // await getTotalTokensMinted();
    } catch (err) {
      console.error(err);
    }
  };

  return useMutation((amount: string) => mintSuperSayanToken(amount), {
    onSuccess: () => {
      queryClient.invalidateQueries(["balance-of-super-sayan-tokens"]);
      queryClient.invalidateQueries(["tokens-to-be-claimed"]);
      queryClient.invalidateQueries(["total-tokens-minted"]);
    },
  });
};

export default useMintSuperSayanToken;
