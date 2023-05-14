import { BigNumber, ethers } from "ethers";
import { useQuery } from "react-query";
import { useWeb3Context } from "context";
import { getTokenContract } from "services/contracts/getTokenContract";

const useGetBalanceOfSuperSayanTokens = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const getBalanceOfCryptoDevTokens = async () => {
    const zero = BigNumber.from(0);

    try {
      const tokenContract = getTokenContract(safeSigner);
      const address = await safeSigner.getAddress();
      const balance = await tokenContract.balanceOf(address);
      return balance;
    } catch (err) {
      console.error({ err });
      return zero;
    }
  };

  return useQuery(
    ["balance-of-super-sayan-tokens"],
    getBalanceOfCryptoDevTokens
  );
};

export default useGetBalanceOfSuperSayanTokens;
