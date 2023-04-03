"use client";

import Navigation from "../components/Navigation";
import { Web3Provider } from "../context";

interface Props {
  children: React.ReactNode;
}

declare global {
  interface Window {
    ethereum: import("ethers").providers.ExternalProvider;
  }
}

export default function RootLayout({ children }: Props) {
  return (
    <html>
      <body>
        <Web3Provider>
          <Navigation />
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
