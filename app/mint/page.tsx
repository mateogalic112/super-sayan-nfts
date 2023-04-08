"use client";

import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import useCheckOwner from "../../hooks/useCheckOwner";
import useCheckPresaleEndsIn from "../../hooks/useCheckPresaleEndsIn";
import useCheckPresaleStarted from "../../hooks/useCheckPresaleStarted";
import useGetNftContractBalance from "../../hooks/useGetNftContractBalance";
import usePresaleMint from "../../hooks/usePresaleMint";
import usePublicMint from "../../hooks/usePublicMint";
import useStartPresale from "../../hooks/useStartPresale";
import useTokenIdsMinted from "../../hooks/useTokenIdsMinted";

const MintPage = () => {
  const [presaleTimeLeft, setPresaleTimeLeft] = useState<BigNumber | null>(
    null
  );

  const presaleMint = usePresaleMint();
  const { isLoading: isLoadingPublicMint, publicMint } = usePublicMint();

  const { data: isOwner } = useCheckOwner();

  const startPresale = useStartPresale();
  const { data: presaleStarted } = useCheckPresaleStarted();
  const { data: presaleEndsIn } = useCheckPresaleEndsIn(presaleStarted);

  const { data: tokenIdsMinted } = useTokenIdsMinted();
  const { data: balance } = useGetNftContractBalance(isOwner);

  useEffect(() => {
    const presaleInterval = setInterval(async function () {
      if (presaleStarted && presaleEndsIn) {
        const hasEnded = presaleEndsIn.lt(Math.floor(Date.now() / 1000));
        if (!hasEnded) {
          setPresaleTimeLeft(presaleEndsIn.sub(Math.floor(Date.now() / 1000)));
        } else {
          setPresaleTimeLeft(BigNumber.from(0));
        }
      }
    }, 1000);

    return () => clearInterval(presaleInterval);
  }, [presaleStarted, presaleEndsIn]);

  const formatTimeLeft = () => {
    const seconds = presaleTimeLeft?.toNumber() ?? 0;
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substring(11, 19);
  };

  const activePresale = (presaleTimeLeft?.toNumber() ?? 0) > 0;

  const renderButton = () => {
    switch (true) {
      case !presaleStarted && isOwner:
        return (
          <button onClick={() => startPresale.mutateAsync()}>
            Start presale!
          </button>
        );
      case !presaleStarted:
        return <div>Presale hasn&#39;t started!</div>;
      case presaleStarted && activePresale:
        return (
          <div>
            <div>
              Presale has started!!! If your address is whitelisted, Mint a
              SuperSayan 🥳
            </div>
            <button onClick={() => presaleMint.mutateAsync()}>
              Presale mint!
            </button>
          </div>
        );
      case presaleStarted && presaleTimeLeft?.toNumber() === 0:
        return <button onClick={() => publicMint()}>Postsale mint!</button>;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Mint page</h1>

      <h6>{tokenIdsMinted?.toString()}</h6>

      {activePresale && <h6>Time left: {formatTimeLeft()}</h6>}

      {renderButton()}

      <h4>Contract balance: {balance?.toString()}</h4>
    </div>
  );
};

export default MintPage;
