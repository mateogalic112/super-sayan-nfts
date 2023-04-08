"use client";

import Link from "next/link";
import useCheckHasJoinedWhitelist from "./hooks/useCheckHasJoinedWhitelist";
import useGetMaxNumberOfWhitelisted from "./hooks/useGetMaxNumberOfWhitelisted";

const JoinWhitelistContainer = () => {
  const { data: joinedWhitelist } = useCheckHasJoinedWhitelist();
  const { data: maxNumberOfWhitelisted } = useGetMaxNumberOfWhitelisted();

  return (
    <div>
      <Link href="/mint">Mint Page</Link>
      <p>{joinedWhitelist ? "You are on whitelist! 🤘" : "Join whitelist"}</p>
      <p>Max Num of whitelisted: {maxNumberOfWhitelisted}</p>
    </div>
  );
};

export default JoinWhitelistContainer;
