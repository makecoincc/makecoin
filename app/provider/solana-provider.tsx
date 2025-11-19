"use client";

import { FC, ReactNode } from "react";
import {
  WalletProvider
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { GillProvider } from "@/app/provider/gill-provider";
interface SolanaProviderProps {
  children: ReactNode;
}

export const SolanaProvider: FC<SolanaProviderProps> = ({ children }) => {
  return (
    <WalletProvider wallets={[]} autoConnect>
      <WalletModalProvider>
        <GillProvider>{children}</GillProvider>
      </WalletModalProvider>
    </WalletProvider>
  );
};