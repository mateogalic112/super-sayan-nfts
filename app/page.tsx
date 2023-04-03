"use client";

import Link from "next/link";
import Inventory from "../components/Inventory";
import MintButton from "../components/MintButton";
import NftContainer from "../components/NftContainer";
import classes from "./index.module.scss";

export default function Home() {
  return (
    <main className={classes.main}>
      <h1>Welcome to Next.js!</h1>
      <MintButton />
      <NftContainer />
      <Inventory />
      <Link href="/whitelist">Whitelist</Link>
    </main>
  );
}
