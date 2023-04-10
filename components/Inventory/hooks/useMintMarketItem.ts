import { useWeb3Context } from "../../../context";
import { ethers, utils } from "ethers";
import { useMutation } from "react-query";
import { getMarketContract } from "../../../services/contracts/getMarketContract";

const useMintMarketItem = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const mintMarketIteam = async (
    itemId: number,
    amount: number,
    price: number
  ) => {
    try {
      const signerAddress = await safeSigner.getAddress();
      const marketContract = getMarketContract(safeSigner);

      const totalPrice = amount * price;
      const tx = await marketContract.mint(signerAddress, itemId, amount, [], {
        value: utils.parseEther(totalPrice.toString()),
      });
      await tx.wait();
      window.alert("You successfully bought item from Marketplace!");
    } catch (err) {
      console.error(err);
    }
  };

  return useMutation(
    ({
      itemId,
      amount,
      price,
    }: {
      itemId: number;
      amount: number;
      price: number;
    }) => mintMarketIteam(itemId, amount, price)
  );
};

export default useMintMarketItem;
