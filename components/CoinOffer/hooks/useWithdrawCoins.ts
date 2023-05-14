import { ethers } from "ethers";
import { useMutation } from "react-query";
import { useWeb3Context } from "context";
import { getTokenContract } from "services/contracts/getTokenContract";

const useWithdrawCoins = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const withdrawCoins = async () => {
    try {
      const tokenContract = getTokenContract(safeSigner);
      const tx = await tokenContract.withdraw();
      await tx.wait();
    } catch (err) {
      console.error({ err });
    }
  };

  return useMutation(withdrawCoins);
};

export default useWithdrawCoins;
