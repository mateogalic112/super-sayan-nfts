"use client";

import useCheckOwner from "../../components/Minting/hooks/useCheckOwner";
import useCheckPresaleStarted from "../../components/Minting/hooks/useCheckPresaleStarted";
import useGetNftContractBalance from "../../components/Minting/hooks/useGetNftContractBalance";
import useTokenIdsMinted from "../../components/Minting/hooks/useTokenIdsMinted";
import ActivePresale from "../../components/Minting/ActivePresale";
import InactivePresale from "../../components/Minting/InactivePresale";

const MintPage = () => {
  const { data: isOwner } = useCheckOwner();
  const { data: presaleStarted } = useCheckPresaleStarted();

  const { data: tokenIdsMinted } = useTokenIdsMinted();
  const { data: balance } = useGetNftContractBalance(isOwner);

  return (
    <div>
      <h1>Mint page</h1>

      <h4>Tokens minted: {tokenIdsMinted?.toString()}</h4>
      {isOwner && <h4>Contract balance: {balance?.toString()}</h4>}

      {presaleStarted ? <ActivePresale /> : <InactivePresale />}
    </div>
  );
};

export default MintPage;
