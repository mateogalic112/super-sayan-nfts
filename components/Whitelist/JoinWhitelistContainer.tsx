"use client";

import Link from "next/link";
import useCheckHasJoinedWhitelist from "./hooks/useCheckHasJoinedWhitelist";
import useGetMaxNumberOfWhitelisted from "./hooks/useGetMaxNumberOfWhitelisted";
import useGetNumAddressesWhitelisted from "./hooks/useGetNumAddressesWhitelisted";

const JoinWhitelistContainer = () => {
  const { data: joinedWhitelist } = useCheckHasJoinedWhitelist();
  const { data: maxNumberOfWhitelisted } = useGetMaxNumberOfWhitelisted();
  const { data: numAddressesWhitelisted } = useGetNumAddressesWhitelisted();

  return (
    <div>
      <p>
        <Link href="/mint">Mint Page</Link>
      </p>
      <p>
        <Link href="/initial-coin-offering">ICO</Link>
      </p>
      <p>{joinedWhitelist ? "You are on whitelist! 🤘" : "Join whitelist"}</p>
      <p>Current Num of whitelisted: {numAddressesWhitelisted}</p>
      <p>Max Num of whitelisted: {maxNumberOfWhitelisted}</p>
    </div>
  );
};

export default JoinWhitelistContainer;
