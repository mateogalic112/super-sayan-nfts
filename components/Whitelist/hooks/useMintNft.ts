import { useMutation } from "react-query";
import { useWeb3State } from "@/context/web3/web3Context";
import { ethers } from "ethers";
import { Dispatch, SetStateAction } from "react";
import { getAdriNFTContract } from "@/contracts/adriNFTContract";
import web3 from "@/services/web3";

const useMintNft = (
  setTransactionActive: Dispatch<SetStateAction<boolean>>,
  setFreshMintedTokenId: Dispatch<SetStateAction<string | null>>,
  setMintingLocked: Dispatch<SetStateAction<boolean>>
) => {
  const { signer } = useWeb3State();

  const mintNft = async () => {
    const contract = getAdriNFTContract(
      signer as ethers.providers.JsonRpcSigner
    );

    const tokenPrice = await contract.tokenPrice();
    const parsedTokenPrice = web3.fromWei(tokenPrice);

    setMintingLocked(true);

    const tx = await contract.mint(1, {
      value: ethers.utils.parseEther(parsedTokenPrice),
    });

    setTransactionActive(true);

    const result = await tx.wait();

    const mintEvent = result.events.find((e: any) => e.event === "Transfer");

    setFreshMintedTokenId(mintEvent.args.tokenId.toString());
  };

  return useMutation(mintNft, { onError: () => setMintingLocked(false) });
};

export default useMintNft;
