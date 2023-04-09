"use client";

import { BigNumber, utils } from "ethers";
import React, { useState } from "react";
import useClaimSuperSayanToken from "./hooks/useClaimSuperSayanToken";
import useGetBalanceOfSuperSayanTokens from "./hooks/useGetBalanceOfSuperSayanTokens";
import useGetTokenMaxTotalSupply from "./hooks/useGetMaxTotalSupply";
import useGetTokenContractOwner from "./hooks/useGetTokenContractOwner";
import useGetTokensToBeClaimed from "./hooks/useGetTokensToBeClaimed";
import useGetTotalTokensMinted from "./hooks/useGetTotalTokensMinted";
import useMintSuperSayanToken from "./hooks/useMintSuperSayanToken";
import useWithdrawCoins from "./hooks/useWithdrawCoins";

export default function CoinOfferContainer() {
  const { data: tokensToBeClaimed } = useGetTokensToBeClaimed();
  const { data: balanceOfSuperSayanTokens } = useGetBalanceOfSuperSayanTokens();
  const { data: totalTokensMinted } = useGetTotalTokensMinted();
  const { data: maxTotalSupply } = useGetTokenMaxTotalSupply();
  const { data: isOwner } = useGetTokenContractOwner();

  const mintSuperSayanToken = useMintSuperSayanToken();
  const claimSuperSayanToken = useClaimSuperSayanToken();
  const withdrawCoins = useWithdrawCoins();

  // amount of the tokens that the user wants to mint
  const [tokenAmount, setTokenAmount] = useState(BigNumber.from(0));

  const renderButton = () => {
    // If tokens to be claimed are greater than 0, Return a claim button
    if ((tokensToBeClaimed?.toNumber() ?? 0) > 0) {
      return (
        <div>
          <div>{tokensToBeClaimed!.toNumber() * 10} Tokens can be claimed!</div>
          <button onClick={() => claimSuperSayanToken.mutateAsync()}>
            Claim Tokens
          </button>
        </div>
      );
    }
    // If user doesn't have any tokens to claim, show the mint button
    return (
      <div>
        <div>
          <input
            type="number"
            placeholder="Amount of Tokens"
            // BigNumber.from converts the `e.target.value` to a BigNumber
            onChange={(e) => setTokenAmount(BigNumber.from(e.target.value))}
          />
        </div>

        <button
          disabled={!(tokenAmount.toNumber() > 0)}
          onClick={() =>
            mintSuperSayanToken.mutateAsync(tokenAmount.toString())
          }
        >
          Mint Tokens
        </button>
      </div>
    );
  };

  return (
    <div>
      <p>
        You have minted{" "}
        {utils.formatEther(balanceOfSuperSayanTokens ?? BigNumber.from(0))}{" "}
        Super Sayan Tokens
      </p>
      <p>
        {/* Format Ether helps us in converting a BigNumber to string */}
        Overall {utils.formatEther(totalTokensMinted ?? BigNumber.from(0))} /
        {utils.formatEther(maxTotalSupply ?? BigNumber.from(0))} have been
        minted!!!
      </p>
      {renderButton()}
      {/* Display additional withdraw button if connected wallet is owner */}
      <div>
        {isOwner && (
          <button onClick={() => withdrawCoins.mutateAsync()}>
            Withdraw Coins
          </button>
        )}
      </div>
    </div>
  );
}
