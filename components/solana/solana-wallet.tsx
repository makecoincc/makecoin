'use client';

import { Divider } from '@heroui/react';
import dynamic from "next/dynamic";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletBalance } from './wallet-balance';
import { NetworkSwitcher } from './network-switcher';
import Airdrop from './airdrop';

// Nextjs hydration error fix
const WalletMultiButton = dynamic(
    () =>
        import("@solana/wallet-adapter-react-ui").then(
            (mod) => mod.WalletMultiButton
        ),
    {
        ssr: false,
        loading: () => {
            return (
                <div
                    className="bg-black border border-gray-800 rounded-md animate-pulse flex items-center"
                    style={{
                        width: "173.47px",
                        height: "48px",
                        padding: "0 12px",
                        gap: "8px",
                    }}
                >
                    <div
                        className="rounded-full bg-purple-400/30"
                        style={{ width: "24px", height: "24px" }}
                    ></div>
                    <div
                        className="h-4 bg-white/10 rounded-sm"
                        style={{ width: "100px" }}
                    ></div>
                </div>
            );
        },
    }
);

export default function SolanaWallet() {
    const { publicKey } = useWallet();
    const [network, setNetwork] = useState<string>("devnet");

    return (
        <div>
            <h2 className="text-default-500 font-medium">Your Wallet</h2>
            <Divider className="my-4" />
            <div className="rounded-2xl">
                <WalletMultiButton />
            </div>
            <WalletBalance address={publicKey?.toString() as string} />
            <h2 className="text-default-500 font-medium mt-12">Current Network</h2>
            <Divider className="my-4" />
            <NetworkSwitcher setNetwork={setNetwork} />
            {network === 'devnet' && (
                <>
                    <h2 className="text-default-500 font-medium mt-12">Airdrop</h2>
                    <Divider className="my-4" />
                    <Airdrop />
                </>
            )}
        </div>
    )
}