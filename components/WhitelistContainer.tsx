import { ethers } from "ethers";
import { useEffect, useState } from "react";
import web3Constants from "../constants/web3";
import Whitelist from "../artifacts/contracts/Whitelist.sol/Whitelist.json";
import { useWeb3Context } from "../context";

const WhitelistContainer = () => {
  // joinedWhitelist keeps track of whether the current metamask address has joined the Whitelist or not
  const [joinedWhitelist, setJoinedWhitelist] = useState(false);
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);
  // numberOfWhitelisted tracks the number of addresses's whitelisted
  const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0);
  const [maxNumberOfWhitelisted, setMaxNumberOfWhitelisted] = useState(0);

  const { signer, connect } = useWeb3Context();

  useEffect(() => {
    async function hasJoinedWhitelist() {
      if (signer) {
        const contract = new ethers.Contract(
          web3Constants.WHITELIST_CONTRACT_ADDRESS,
          Whitelist.abi,
          signer
        );

        try {
          const _joinedWhitelist = await contract.whitelistedAddresses(
            signer.getAddress()
          );
          const _numberOfWhitelisted = await contract.numAddressesWhitelisted();
          const _maxNumberOfWhitelisted =
            await contract.maxWhitelistedAddresses();
          setJoinedWhitelist(_joinedWhitelist);
          setNumberOfWhitelisted(_numberOfWhitelisted);
          setMaxNumberOfWhitelisted(_maxNumberOfWhitelisted);
        } catch (err) {
          console.log({ err });
        }
      }
    }
    hasJoinedWhitelist();
  }, [signer]);

  return (
    <div>
      <p>{joinedWhitelist ? "You are on whitelist! 🤘" : "Join"}</p>
      <p>Num of whitelisted: {numberOfWhitelisted}</p>
      <p>Max Num of whitelisted: {maxNumberOfWhitelisted}</p>
    </div>
  );
};

export default WhitelistContainer;
