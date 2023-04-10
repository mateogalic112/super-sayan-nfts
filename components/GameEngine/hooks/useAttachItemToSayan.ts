import { useWeb3Context } from "../../../context";
import { ethers } from "ethers";
import { useMutation, useQueryClient } from "react-query";
import { getGameEngineContract } from "../../../services/contracts/getGameEngineContract";
import { getMarketContract } from "../../../services/contracts/getMarketContract";

const getApprovalFromMarket = async (
  safeSigner: ethers.providers.JsonRpcSigner,
  gameEngineAddress: string
) => {
  const market = getMarketContract(safeSigner);
  const signerAddress = await safeSigner.getAddress();
  const isApproved = await market.isApprovedForAll(
    signerAddress,
    gameEngineAddress
  );
  if (!isApproved) {
    await market.setApprovalForAll(gameEngineAddress, true);
  }
};

const useAttachItemToSayan = () => {
  const queryClient = useQueryClient();

  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const attachItemToSayan = async (tokenId: number, weaponId: number) => {
    try {
      const gameEngineContract = getGameEngineContract(safeSigner);
      await getApprovalFromMarket(safeSigner, gameEngineContract.address);

      const tx = await gameEngineContract.attachItem(tokenId, weaponId);
      await tx.wait();
      window.alert("You successfully attached item to Sayan!");
    } catch (err) {
      console.error(err);
    }
  };

  return useMutation(
    ({ tokenId, weaponId }: { tokenId: number; weaponId: number }) =>
      attachItemToSayan(tokenId, weaponId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["get-attached-items"]);
      },
    }
  );
};

export default useAttachItemToSayan;
