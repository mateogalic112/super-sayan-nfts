import { ethers } from "ethers";
import web3Constants from "../constants/web3";
import Whitelist from "../artifacts/contracts/Whitelist.sol/Whitelist.json";

const WhitelistButton = () => {
  let joinWhitelist;
  if (typeof window !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
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
