"use client";

import { BigNumber } from "ethers";
import { useState } from "react";
import PresaleInterval from "components/Minting/PresaleInterval";
import useCheckPresaleEndsIn from "components/Minting/hooks/useCheckPresaleEndsIn";
import useCheckPresaleStarted from "components/Minting/hooks/useCheckPresaleStarted";
import usePresaleMint from "components/Minting/hooks/usePresaleMint";
import usePublicMint from "components/Minting/hooks/usePublicMint";

const ActivePresale = () => {
  const presaleMint = usePresaleMint();
  const publicMint = usePublicMint();

  const { data: presaleStarted } = useCheckPresaleStarted();
  const { data: presaleEndsIn } = useCheckPresaleEndsIn(presaleStarted);
  const [presaleTimeLeft, setPresaleTimeLeft] = useState<BigNumber | null>(
    null
  );

  const activePresale = (presaleTimeLeft?.toNumber() ?? 0) > 0;

  const renderButton = () => {
    switch (true) {
      case activePresale:
        return (
          <div>
            <div>
              Presale has started!!! If your address is whitelisted, Mint a
              SuperSayan 🥳
            </div>
            <div style={{ height: "20px" }} />
            <button onClick={() => presaleMint.mutateAsync()}>
              Presale mint!
            </button>
          </div>
        );
      case presaleTimeLeft?.toNumber() === 0:
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
      <PresaleInterval
        presaleStarted={presaleStarted}
        presaleEndsIn={presaleEndsIn}
        presaleTimeLeft={presaleTimeLeft}
        setPresaleTimeLeft={setPresaleTimeLeft}
      />

      {renderButton()}
    </div>
  );
};

export default ActivePresale;
