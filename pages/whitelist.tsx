import Head from "next/head";
import WhitelistButton from "../components/WhitelistButton";
import WhitelistContainer from "../components/WhitelistContainer";

export default function Whitelist() {
  return (
    <div>
      <Head>
        <title>Whitelist Dapp</title>
        <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Whitelist Dapp</h1>
        <WhitelistContainer />
        <WhitelistButton />
      </main>
    </div>
  );
}
