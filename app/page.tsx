"use client";

import Link from "next/link";
import Inventory from "../components/Inventory";
import NftContainer from "../components/Nfts/NftContainer";
import classes from "./index.module.scss";

export default function Home() {
  return (
    <main className={classes.main}>
      <p>
        <Link href="/whitelist">Join Whitelist</Link>
      </p>
      <p>
        <Link href="/mint">Mint Nfts!</Link>
      </p>
      <NftContainer />
      <Inventory />
    </main>
  );
}
