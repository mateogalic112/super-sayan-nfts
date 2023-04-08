"use client";

import useCheckHasJoinedWhitelist from "./hooks/useCheckHasJoinedWhitelist";
import useJoinWhitelist from "./hooks/useJoinWhitelist";

const JoinWhitelistButton = () => {
  const { data: joinedWhitelist } = useCheckHasJoinedWhitelist();
  const joinWhitelist = useJoinWhitelist();

  if (joinedWhitelist) {
    return <p>Joined! 🫡</p>;
  }

  return <button onClick={() => joinWhitelist.mutateAsync()}>Join</button>;
};

export default JoinWhitelistButton;
