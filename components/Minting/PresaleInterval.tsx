import { BigNumber } from "ethers";
import React, { Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  presaleStarted: boolean | undefined;
  presaleEndsIn: BigNumber | undefined;
  presaleTimeLeft: BigNumber | null;
  setPresaleTimeLeft: Dispatch<SetStateAction<BigNumber | null>>;
}

const PresaleInterval = ({
  presaleStarted,
  presaleEndsIn,
  presaleTimeLeft,
  setPresaleTimeLeft,
}: Props) => {
  const formatTimeLeft = () => {
    const seconds = presaleTimeLeft?.toNumber() ?? 0;
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substring(11, 19);
  };

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

  if (!presaleTimeLeft || presaleTimeLeft.toNumber() === 0) return null;

  return <h4>Time left: {formatTimeLeft()}</h4>;
};

export default PresaleInterval;
