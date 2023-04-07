"use client";

import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import useCheckPresaleEndsIn from "../../hooks/useCheckPresaleEndsIn";
import useCheckPresaleStarted from "../../hooks/useCheckPresaleStarted";
import useCheckOwner from "../../hooks/useGetOwner";
import usePresaleMint from "../../hooks/usePresaleMint";
import usePublicMint from "../../hooks/usePublicMint";
import useStartPresale from "../../hooks/useStartPresale";
import useTokenIdsMinted from "../../hooks/useTokenIdsMinted";

const MintPage = () => {
  // presaleStarted keeps track of whether the presale has started or not
  const [presaleStarted, setPresaleStarted] = useState(false);
  // presaleEnds in keeps track of time when sale ends
  const [presaleEndsIn, setPresaleEndsIn] = useState<BigNumber | null>(null);
  const [presaleTimeLeft, setPresaleTimeLeft] = useState<BigNumber | null>(
    null
  );
  // tokenIdsMinted keeps track of the number of tokenIds that have been minted
  const [tokenIdsMinted, setTokenIdsMinted] = useState("0");

  const { isLoading: isLoadingPresaleMint, presaleMint } = usePresaleMint();
  const { isLoading: isLoadingPublicMint, publicMint } = usePublicMint();
  const { isLoading: isLoadingStartPresale, startPresale } = useStartPresale();
  const { checkIsOwner } = useCheckOwner();
  const { checkPresaleStarted } = useCheckPresaleStarted();
  const { getPresaleEndsIn } = useCheckPresaleEndsIn();
  const { getTokenIdsMinted } = useTokenIdsMinted();

  useEffect(() => {
    (async function checkPresale() {
      const _presaleStarted = await checkPresaleStarted();
      setPresaleStarted(_presaleStarted);
    })();
  }, []);

  useEffect(() => {
    (async function checkEndsIn() {
      if (presaleStarted) {
        const _presaleEndsIn = await getPresaleEndsIn();
        setPresaleEndsIn(_presaleEndsIn);
      }
    })();
  }, [presaleStarted]);

  useEffect(() => {
    const presaleInterval = setInterval(async function () {
      if (presaleStarted && presaleEndsIn !== null) {
        const hasEnded = presaleEndsIn.lt(Math.floor(Date.now() / 1000));
        if (!hasEnded) {
          setPresaleTimeLeft(presaleEndsIn.sub(Math.floor(Date.now() / 1000)));
        } else {
          setPresaleTimeLeft(BigNumber.from(0));
        }
      }
    }, 1 * 1000);

    return () => clearInterval(presaleInterval);
  }, [presaleStarted, presaleEndsIn]);

  useEffect(() => {
    const tokenInterval = setInterval(async function () {
      const mintedTokens = await getTokenIdsMinted();
      setTokenIdsMinted(mintedTokens);
    }, 5 * 1000);

    return () => clearInterval(tokenInterval);
  }, []);

  const formatTimeLeft = () => {
    const seconds = presaleTimeLeft?.toNumber() ?? 0;
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substring(11, 19);
  };

  return (
    <div>
      <h1>Mint page</h1>
      {!presaleStarted && (
        <button onClick={() => startPresale()}>Start presale!</button>
      )}
      {Boolean(presaleEndsIn?.toNumber() ?? 0) && (
        <button onClick={() => presaleMint()}>Presale mint!</button>
      )}
      {presaleStarted && !Boolean(presaleEndsIn?.toNumber() ?? 0) && (
        <button onClick={() => presaleMint()}>Postsale mint!</button>
      )}
      <h6>Ends in: {presaleEndsIn?.toNumber()}</h6>
      <h6>Time left: {formatTimeLeft()}</h6>
    </div>
  );
};

export default MintPage;
