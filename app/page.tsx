"use client";

import Link from "next/link";
import Inventory from "../components/Inventory";
import NftContainer from "../components/Nfts/NftContainer";
import classes from "./index.module.scss";

export default function Home() {
  return (
    <main className={classes.main}>
      <Link href="/whitelist">Join Whitelist</Link>
      <Link href="/mint">Mint Nfts!</Link>
      <NftContainer />
      <Inventory />
    </main>
  );
}
