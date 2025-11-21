"use client";

import { FC, ReactNode } from "react";
import {
  WalletProvider
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import {
  PhantomWalletAdapter,
} from '@solana/wallet-adapter-wallets';
interface SolanaProviderProps {
  children: ReactNode;
}

const wallets = [
  new PhantomWalletAdapter(),
];

export const SolanaProvider: FC<SolanaProviderProps> = ({ children }) => {
  return (
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        {children}
      </WalletModalProvider>
    </WalletProvider>
  );
};