"use client";

import Link from "next/link";
import { DndProvider } from "react-dnd";
import Container from "../components/GameEngine/Container";
import WeaponContainer from "../components/Inventory/WeaponContainer";
import NftContainer from "../components/Nfts/NftContainer";
import classes from "./index.module.scss";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className={classes.main}>
        <Container />
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
    </DndProvider>
  );
}
