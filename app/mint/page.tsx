"use client";

import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import useCheckPresaleEndsIn from "../../hooks/useCheckPresaleEndsIn";
import useCheckPresaleStarted from "../../hooks/useCheckPresaleStarted";
import useGetNftContractBalance from "../../hooks/useGetNftContractBalance";
import useCheckOwner from "../../hooks/useGetOwner";
import usePresaleMint from "../../hooks/usePresaleMint";
import usePublicMint from "../../hooks/usePublicMint";
import useStartPresale from "../../hooks/useStartPresale";
import useTokenIdsMinted from "../../hooks/useTokenIdsMinted";

const MintPage = () => {
  const [presaleStarted, setPresaleStarted] = useState(false);
  const [presaleEndsIn, setPresaleEndsIn] = useState<BigNumber | null>(null);
  const [presaleTimeLeft, setPresaleTimeLeft] = useState<BigNumber | null>(
    null
  );
  const [isOwner, setIsOwner] = useState(false);
  const [balance, setBalance] = useState(BigNumber.from(0));
  const [tokenIdsMinted, setTokenIdsMinted] = useState(BigNumber.from(0));

  const { isLoading: isLoadingPresaleMint, presaleMint } = usePresaleMint();
  const { isLoading: isLoadingPublicMint, publicMint } = usePublicMint();
  const { isLoading: isLoadingStartPresale, startPresale } = useStartPresale();
  const { checkIsOwner } = useCheckOwner();
  const { checkPresaleStarted } = useCheckPresaleStarted();
  const { getPresaleEndsIn } = useCheckPresaleEndsIn();
  const { getTokenIdsMinted } = useTokenIdsMinted();
  const { getContractBalance } = useGetNftContractBalance();

  useEffect(() => {
    (async function checkOnwer() {
      const _balance = await getContractBalance();
      setBalance(_balance);
    })();
  }, []);

  useEffect(() => {
    (async function checkOnwer() {
      const _owner = await checkIsOwner();
      setIsOwner(_owner);
    })();
  }, []);

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
    (async function () {
      const mintedTokens = await getTokenIdsMinted();
      setTokenIdsMinted(mintedTokens);
    })();

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

  const activePresale = (presaleTimeLeft?.toNumber() ?? 0) > 0;

  const renderButton = () => {
    switch (true) {
      case !presaleStarted && isOwner:
        return <button onClick={() => startPresale()}>Start presale!</button>;
      case !presaleStarted:
        return <div>Presale hasn&#39;t started!</div>;
      case presaleStarted && activePresale:
        return (
          <div>
            <div>
              Presale has started!!! If your address is whitelisted, Mint a
              SuperSayan 🥳
            </div>
            <button onClick={() => presaleMint()}>Presale mint!</button>
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

      <h6>{tokenIdsMinted.toString()}</h6>

      {activePresale && <h6>Time left: {formatTimeLeft()}</h6>}

      {renderButton()}

      <h4>Contract balance: {balance.toString()}</h4>
    </div>
  );
};

export default MintPage;
