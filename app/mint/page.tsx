"use client";

import { BigNumber } from "ethers";
import { useState } from "react";
import PresaleInterval from "../../components/Minting/PresaleInterval";
import useCheckOwner from "../../components/Minting/hooks/useCheckOwner";
import useCheckPresaleEndsIn from "../../components/Minting/hooks/useCheckPresaleEndsIn";
import useCheckPresaleStarted from "../../components/Minting/hooks/useCheckPresaleStarted";
import useGetNftContractBalance from "../../components/Minting/hooks/useGetNftContractBalance";
import usePresaleMint from "../../components/Minting/hooks/usePresaleMint";
import usePublicMint from "../../components/Minting/hooks/usePublicMint";
import useStartPresale from "../../components/Minting/hooks/useStartPresale";
import useTokenIdsMinted from "../../components/Minting/hooks/useTokenIdsMinted";

const MintPage = () => {
  const presaleMint = usePresaleMint();
  const publicMint = usePublicMint();

  const { data: isOwner } = useCheckOwner();

  const startPresale = useStartPresale();

  const { data: presaleStarted } = useCheckPresaleStarted();
  const { data: presaleEndsIn } = useCheckPresaleEndsIn(presaleStarted);
  const [presaleTimeLeft, setPresaleTimeLeft] = useState<BigNumber | null>(
    null
  );

  const { data: tokenIdsMinted } = useTokenIdsMinted();
  const { data: balance } = useGetNftContractBalance(isOwner);

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
        return (
          <button onClick={() => publicMint.mutateAsync()}>
            Postsale mint!
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Mint page</h1>

      <h4>Tokens minted: {tokenIdsMinted?.toString()}</h4>

      <PresaleInterval
        presaleStarted={presaleStarted}
        presaleEndsIn={presaleEndsIn}
        presaleTimeLeft={presaleTimeLeft}
        setPresaleTimeLeft={setPresaleTimeLeft}
      />

      {renderButton()}

      {isOwner && <h4>Contract balance: {balance?.toString()}</h4>}
    </div>
  );
};

export default MintPage;
