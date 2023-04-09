import { useWeb3Context } from "../../../context";
import { ethers } from "ethers";
import { getNftContract } from "../../../services/contracts/getNftContract";
import { useMutation, useQueryClient } from "react-query";

const usePresaleMint = () => {
  const queryClient = useQueryClient();

  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const presaleMint = async () => {
    try {
      const nftContract = getNftContract(safeSigner);
      const tx = await nftContract.presaleMint({
        value: ethers.utils.parseEther("0.025"),
      });
      await tx.wait();
      window.alert("You successfully minted a Super Sayan Token on presale!");
    } catch (err) {
      console.error(err);
    }
  };

  return useMutation(presaleMint, {
    onSuccess: () => {
      queryClient.invalidateQueries(["tokens-to-be-claimed"]);
    },
  });
};

export default usePresaleMint;
