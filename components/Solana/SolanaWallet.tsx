'use client';

import { Button, Divider, Chip, addToast } from '@heroui/react';
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import {
  Connection,
  LAMPORTS_PER_SOL,
  clusterApiUrl
} from "@solana/web3.js";
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
    const { connection } = useConnection();
    const [balance, setBalance] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchBalance = async () => {
            if (publicKey) {
                const lamports = await connection.getBalance(publicKey);
                setBalance(lamports / 1e9); // Convert lamports to SOL
            }
        };

        fetchBalance();
    }, [publicKey, connection]);

    const requestAirdrop = async () => {
        setIsLoading(true);
        try {
            if (publicKey) {
                const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
                const airdropAmt = 1 * LAMPORTS_PER_SOL;
                const signature = await connection.requestAirdrop(publicKey, airdropAmt);
                console.log("Airdrop signature:", signature);
                setIsLoading(false);
                addToast({
                    title: "Airdrop successful",
                    description: "You have successfully requested an airdrop.",
                    color: "success",
                    endContent: (
                        <Button
                            size="sm"
                            variant="bordered"
                            onPress={() => {
                                window.open(
                                    `https://explorer.solana.com/tx/${signature}?cluster=devnet`
                                );
                            }}
                        >
                            View on Solana Explorer
                        </Button>
                    ),
                });
            } else {
                setIsLoading(false);
                addToast({
                    title: "Wallet not connected",
                    description: "Please connect your wallet to request an airdrop.",
                    color: "danger",
                });
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error requesting airdrop:", error);
            addToast({
                title: "Error requesting airdrop",
                description: "Please try again.",
                color: "danger",
            });
        }
        
    };
    return (
        <div>
            <h2 className="text-default-500 font-medium">Your Wallet</h2>
            <Divider className="my-4" />
            <div className="rounded-2xl">
                <WalletMultiButton />
            </div>
            <div className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                {publicKey ? (
                    balance !== null ? (
                        <p>Balance: {balance.toFixed(4)} SOL</p>
                    ) : (
                        <p>Loading balance...</p>

                    )
                ) : (
                    <p>Connect your wallet to view your balance.</p>
                )}
            </div>
            {
                publicKey && (
                    <>
                        <h2 className="text-default-500 font-medium mt-12">Current Network</h2>
                        <Divider className="my-4" />
                        <Chip color="warning" variant="shadow">
                            Devnet
                        </Chip>
                        <h2 className="text-default-500 font-medium mt-12">Other</h2>
                        <Divider className="my-4" />
                        <Button
                            isLoading={isLoading}
                            disabled={!publicKey}
                            size="lg"
                            variant="bordered"
                            onPress={requestAirdrop}
                        >
                            Airdrop 1 SOL
                        </Button>
                        <p className="text-default-500 font-medium mt-4">
                            Note: requires airdrop request on Devnet. if fails, use <a href="https://faucet.solana.com/" target="_blank" rel="noopener noreferrer" className="text-primary-500">Solana Faucet</a>
                        </p>
                    </>
                )
            }
        </div>
    )
}