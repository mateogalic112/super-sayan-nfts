import { useWeb3Context } from "context";
import { ethers } from "ethers";
import { useQuery } from "react-query";
import { getMarketContract } from "services/contracts/getMarketContract";

const useBalanceOf = (tokenId: number) => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const checkBalanceOf = async () => {
    try {
      const marketContract = getMarketContract(safeSigner);
      const address = await safeSigner.getAddress();

      const balance = await marketContract.balanceOf(address, tokenId);
      return balance;
    } catch (err) {
      console.error(err);
      return 0;
    }
  };

  return useQuery(["erc1155-balance-of", tokenId], checkBalanceOf, {
    enabled: !!tokenId && !!safeSigner,
  });
};

export default useBalanceOf;
