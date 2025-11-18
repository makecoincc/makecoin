"use client";

import React, { FC, ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

interface SolanaProviderProps {
  children: ReactNode;
}

export const SolanaProvider: FC<SolanaProviderProps> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;

  // Define RPC endpoint manually without using clusterApiUrl
  const endpoint = useMemo(() => {
    switch (network) {
      case WalletAdapterNetwork.Devnet:
        return "https://api.devnet.solana.com";
      // case WalletAdapterNetwork.Testnet:
      //   return "https://api.testnet.solana.com";
      // case WalletAdapterNetwork.Mainnet:
      //   return "https://api.mainnet-beta.solana.com";
      default:
        return "https://api.devnet.solana.com";
    }
  }, [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};