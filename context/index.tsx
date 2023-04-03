"use client";
import { ethers } from "ethers";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface IWeb3Context {
  signer: ethers.providers.JsonRpcSigner | null;

  connect: () => void;
}

const initialContext: IWeb3Context = {
  signer: null,

  connect: () => {},
};

const Web3Context = createContext<IWeb3Context>(initialContext);

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
    null
  );

  const connect = useCallback(async () => {
    if (typeof window !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const _signer = provider.getSigner();
      setSigner(_signer);
    }
  }, []);

  const value = useMemo(
    () => ({
      signer,
      connect,
    }),
    [signer, connect]
  );

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export const useWeb3Context = () => {
  const context = useContext(Web3Context);

  if (!context) {
    throw new Error("Context must be within Web3Context.Provider!");
  }

  return context;
};
