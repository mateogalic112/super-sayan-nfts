import useJoinWhitelist from "./Whitelist/hooks/useJoinWhitelist";

const WhitelistButton = () => {
  const joinWhitelist = useJoinWhitelist();
  const handleJoin = async () => {
    try {
      await joinWhitelist.mutateAsync();
    } catch (err) {
      console.log({ err });
    }
  };

  return <button onClick={handleJoin}>Join</button>;
};

export default WhitelistButton;
