"use client";

import Link from "next/link";
import Inventory from "../components/Inventory";
import MintButton from "../components/MintButton";
import NftContainer from "../components/NftContainer";
import classes from "./index.module.scss";

export default function Home() {
  return (
    <main className={classes.main}>
      <h1>Welcome to Super Sayan Dapp!</h1>
      <Link href="/whitelist">Join Whitelist</Link>
      <Link href="/mint">Mint Nfts!</Link>
      <MintButton />
      <NftContainer />
      <Inventory />
    </main>
  );
}
