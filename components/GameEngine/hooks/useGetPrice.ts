import { useWeb3Context } from "../../../context";
import { ethers } from "ethers";
import { useQuery } from "react-query";
import { getGameEngineContract } from "../../../services/contracts/getGameEngineContract";

const useGetPrice = () => {
  const { signer } = useWeb3Context();
  const safeSigner = signer as ethers.providers.JsonRpcSigner;

  const getPrice = async () => {
    try {
      const gameEngineContract = getGameEngineContract(safeSigner);
      const price = await gameEngineContract.retrievePrice();
      return price;
    } catch (err) {
      console.error(err);
      return 0;
    }
  };

  return useQuery(["get-price"], getPrice, { enabled: !!safeSigner });
};

export default useGetPrice;
