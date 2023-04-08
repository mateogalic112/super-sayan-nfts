"use client";

import useCheckHasJoinedWhitelist from "./hooks/useCheckHasJoinedWhitelist";
import useJoinWhitelist from "./hooks/useJoinWhitelist";

const JoinWhitelistButton = () => {
  const { data: joinedWhitelist } = useCheckHasJoinedWhitelist();

  const joinWhitelist = useJoinWhitelist();
  const handleJoin = async () => {
    try {
      await joinWhitelist.mutateAsync();
    } catch (err) {
      console.log({ err });
    }
  };

  if (joinedWhitelist) {
    return <p>Joined! 🫡</p>;
  }

  return <button onClick={handleJoin}>Join</button>;
};

export default JoinWhitelistButton;
