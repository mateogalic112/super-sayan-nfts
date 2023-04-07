"use client";

import Link from "next/link";
import WhitelistButton from "../../components/WhitelistButton";
import WhitelistContainer from "../../components/WhitelistContainer";

export default function Whitelist() {
  return (
    <main>
      <h1>Whitelist Dapp</h1>
      <WhitelistContainer />
      <WhitelistButton />
      <Link href="/mint">Mint Page</Link>
    </main>
  );
}
