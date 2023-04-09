"use client";

import Link from "next/link";
import Price from "../components/GameEngine/Price";
import WeaponContainer from "../components/Inventory/WeaponContainer";
import NftContainer from "../components/Nfts/NftContainer";
import classes from "./index.module.scss";

export default function Home() {
  return (
    <main className={classes.main}>
      <Price />
      <p>
        <Link href="/whitelist">Join Whitelist</Link>
      </p>
      <p>
        <Link href="/mint">Mint Nfts!</Link>
      </p>
      <h3>NFTS</h3>
      <NftContainer />

      <h3>Marketplace</h3>
      <WeaponContainer />
    </main>
  );
}
