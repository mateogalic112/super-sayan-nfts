"use client";

import { useEffect, useState } from "react";
import { useWeb3Context } from "../context";

const Navigation = () => {
  const [signerAddress, setSignerAddress] = useState<string | undefined>(
    undefined
  );
  const { signer, connect } = useWeb3Context();

  useEffect(() => {
    (async function setAddress(_signer: typeof signer) {
      if (!signer) {
        setSignerAddress(undefined);
      } else {
        setSignerAddress(await _signer?.getAddress());
      }
    })(signer);
  }, [signer]);

  return (
    <header>
      <h1>Super Sayan Nft</h1>
      {signer ? (
        <p>{signerAddress}</p>
      ) : (
        <button onClick={connect}>Connect</button>
      )}
    </header>
  );
};

export default Navigation;
