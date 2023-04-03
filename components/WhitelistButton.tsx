import { ethers } from "ethers";
import web3Constants from "../constants/web3";
import Whitelist from "../artifacts/contracts/Whitelist.sol/Whitelist.json";
import { useWeb3Context } from "../context";

const WhitelistButton = () => {
  const { signer } = useWeb3Context();

  let joinWhitelist;
  if (signer) {
    const contract = new ethers.Contract(
      web3Constants.WHITELIST_CONTRACT_ADDRESS,
      Whitelist.abi,
      signer
    );

    joinWhitelist = async () => {
      try {
        const tx = await contract.addAddressToWhitelist({
          value: ethers.utils.parseEther("1"),
        });

        await tx.wait();
      } catch (err) {
        console.log({ err });
      }
    };
  }

  return <button onClick={joinWhitelist}>Join</button>;
};

export default WhitelistButton;
