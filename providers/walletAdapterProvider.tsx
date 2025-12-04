"use client";

import {
  WalletProvider,
  ConnectionProvider
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import React, { FC, useMemo } from "react";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

type Props = {
  children?: React.ReactNode;
};

export const WalletAdapterProvider: FC<Props> = ({ children }) => {

  const endpoint = `${process.env.NEXT_PUBLIC_DEV_RPC_URL}?api-key=${process.env.NEXT_PUBLIC_HELIUS_KEY}`;
  const wallets = useMemo(
    () => [
      /**
       * Wallets that implement either of these standards will be available automatically.
       *
       *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
       *     (https://github.com/solana-mobile/mobile-wallet-adapter)
       *   - Solana Wallet Standard
       *     (https://github.com/anza-xyz/wallet-standard)
       *
       * If you wish to support a wallet that supports neither of those standards,
       * instantiate its legacy wallet adapter here. Common legacy adapters can be found
       * in the npm package `@solana/wallet-adapter-wallets`.
       */
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {/* Your app's components go here, nested within the context providers. */}
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
