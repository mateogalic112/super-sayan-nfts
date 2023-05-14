import { useWeb3Context } from "context";
import { ethers } from "ethers";
import { useMutation, useQueryClient } from "react-query";
import { getNftContract } from "services/contracts/getNftContract";

const useStartPresale = () => {
  const queryClient = useQueryClient();

  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const startPresale = async () => {
    try {
      const nftContract = getNftContract(safeSigner);
      const tx = await nftContract.startPresale();
      await tx.wait();
    } catch (err) {
      console.error(err);
    }
  };

  return useMutation(startPresale, {
    onSuccess: () => {
      queryClient.invalidateQueries("check-presale-started");
    },
  });
};

export default useStartPresale;
