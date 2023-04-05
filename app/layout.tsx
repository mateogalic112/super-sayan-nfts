"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Web3Provider } from "../context";
import Navigation from "../components/Navigation";

interface Props {
  children: React.ReactNode;
}

declare global {
  interface Window {
    ethereum: import("ethers").providers.ExternalProvider;
  }
}

export default function RootLayout({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html>
      <body>
        <QueryClientProvider client={queryClient}>
          <Web3Provider>
            <Navigation />
            {children}
          </Web3Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
