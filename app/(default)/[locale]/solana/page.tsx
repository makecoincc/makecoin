'use client';
import { useRouter } from "next/navigation";
import ActionCard from "@/components/ActionCard";
import SolanaWallet from "@/components/SolanaWallet";

// import { PublicKey } from "@solana/web3.js";
import { Breadcrumbs, BreadcrumbItem } from '@heroui/react';
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

export default function SolanaPage() {
    const router = useRouter();

    return (
        <section className="w-full mx-auto max-w-6xl py-10 md:px-6 lg:px-8 px-4 md:px-6 lg:px-8">
            <div className="flex flex-col gap-1 mb-4">
                <h1 className="text-2xl font-medium">Solana Tools</h1>
                <Breadcrumbs>
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Solana Tools</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 order-2 md:order-1">
                    {solanaTools.map((tool, index) => (
                        <ActionCard
                            key={index}
                            title={tool.title}
                            description={tool.description}
                            color="secondary"
                            icon="solar:document-medicine-linear"
                            onPress={() => {
                                router.push(tool.url);
                            }}
                        />
                    ))}
                </div>
                <div className="rounded-medium bg-content2 dark:bg-content1 w-full px-4 py-4 md:px-6 md:py-8 lg:w-[300px] lg:flex-none order-1 md:order-2 mb-4 md:mb-0">
                    <SolanaWallet />
                </div>
            </div>
        </section>
    )
}