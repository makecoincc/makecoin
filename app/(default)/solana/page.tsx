'use client';
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import ActionCard from "@/components/action-card";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

const solanaTools = [
    { title: "Create a Token Mint", description: "Create an SPL Token mint.", url: "/solana/create-token-mint" },
    { title: "Create a Token Account", description: "Create SPL Token Accounts.", url: "/solana/create-token-account" },
    { title: "Mint Tokens", description: "Mint new units of a token.", url: "/solana/mint-tokens" },
    { title: "Transfer Tokens", description: "Transfer tokens between token accounts.", url: "/solana/transfer-tokens" },
    { title: "Approve Delegate", description: "Approve delegates for a token account.", url: "/solana/approve-delegate" },
    { title: "Revoke Delegate", description: "Revoke the token account delegate.", url: "/solana/revoke-delegate" },
    { title: "Set Authority", description: "Set authority for mints or token accounts.", url: "/solana/set-authority" },
    { title: "Burn Tokens", description: "Burn tokens.", url: "/solana/burn-tokens" },
    { title: "Sync Native", description: "Convert native SOL to wrapped SOL.", url: "/solana/sync-native" },
    { title: "Close Token Account", description: "Close token accounts.", url: "/solana/close-token-account" },
    { title: "Freeze Account", description: "Freeze token accounts.", url: "/solana/freeze-account" },
    { title: "Thaw Account", description: "Thaw a frozen token account.", url: "/solana/thaw-account" },
]

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

export default function SolanaPage() {
    const router = useRouter();
    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const [balance, setBalance] = useState<number | null>(null);

    useEffect(() => {
        const fetchBalance = async () => {
            if (publicKey) {
                const lamports = await connection.getBalance(publicKey);
                setBalance(lamports / 1e9); // Convert lamports to SOL
            }
        };

        fetchBalance();
    }, [publicKey, connection]);
    return (
        <div className="max-w-[1200px] mx-auto px-4 py-20 sm:py-32 md:px-6 lg:px-8">
            <header className="mb-6 flex w-full items-center justify-between">
                <div className="flex flex-col">
                    <h1 className="text-default-900 text-xl font-bold lg:text-3xl">Solana Tools</h1>
                    <div className="text-small text-default-400 lg:text-medium">{publicKey ? (
                        balance !== null ? (
                            <p>Balance: {balance.toFixed(4)} SOL</p>
                        ) : (
                            <p>Loading balance...</p>
                        )
                    ) : (
                        <p>Connect your wallet to view your balance.</p>
                    )}</div>
                </div>
                <WalletMultiButton />
            </header>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {solanaTools.map((tool, index) => (
                    <ActionCard
                        key={index}
                        title={tool.title}
                        description={tool.description}
                        icon="solar:document-medicine-linear"
                        onPress={() => {
                            router.push(tool.url);
                        }}
                    />
                ))}
            </div>
        </div>
    )
}