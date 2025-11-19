'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from 'framer-motion';
import ActionCard from "@/components/action-card";
import SolanaWallet from "@/components/solana/solana-wallet";
import CreateToken from "@/components/solana/create-token";
import AddMetadata from "@/components/solana/add-metadata";
import ApproveRevokeDelegate from "@/components/solana/approve-revoke-delegate";
import BurnTokens from "@/components/solana/butn-tokens";
import CloseAccount from "@/components/solana/close-token-account";
import FreezeThawAccount from "@/components/solana/freeze-thaw-account";
import MintTokens from "@/components/solana/mint-tokens";
import SetAuthority from "@/components/solana/set-authority";
import TransferTokens from "@/components/solana/transfer-tokens";
// import { PublicKey } from "@solana/web3.js";
import { Breadcrumbs, BreadcrumbItem } from '@heroui/react';
const solanaTools = [
    { title: "Create Token", description: "Create an SPL token", key: "create-token" },
    // { title: "Add Metadata to a Token", description: "Add metadata to a token", key: "add-metadata" },
    { title: "Mint Tokens", description: "Mint tokens to a token account", key: "mint-tokens" },
    { title: "Transfer Tokens", description: "Transfer tokens between token accounts", key: "transfer-tokens" },
    { title: "Approve/Revoke Delegate", description: "Approve/Revoke delegates for a token account", key: "approve-revoke-delegate" },
    { title: "Set Authority", description: "Set authority for mints or token accounts", key: "set-authority" },
    { title: "Burn Tokens", description: "Burn tokens", key: "burn-tokens" },
    { title: "Close Token Account", description: "Close token accounts", key: "close-token-account" },
    { title: "Freeze/Thaw Account", description: "Freeze/Thaw token accounts", key: "freeze-thaw-account" },
]

interface SolanaToolsProps {
    onToolSelect?: (key: string) => void;
    network: string;
}

const SolanaTools = ({ onToolSelect, network }: SolanaToolsProps) => (  
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {solanaTools.map((tool, index) => (
            <ActionCard
                key={index}
                title={tool.title}
                description={tool.description}
                color="secondary"
                icon="solar:document-medicine-linear"
                onPress={() => {
                    if (onToolSelect) {
                        onToolSelect(tool.key);
                    }
                }}
            />
        ))}
    </div>
)

const components = {
    "solana-tools": SolanaTools,
    "create-token": CreateToken,
    // "add-metadata": AddMetadata,
    "approve-revoke-delegate": ApproveRevokeDelegate,
    "burn-tokens": BurnTokens,
    "close-token-account": CloseAccount,
    "freeze-thaw-account": FreezeThawAccount,
    "mint-tokens": MintTokens,
    "set-authority": SetAuthority,
    "transfer-tokens": TransferTokens
}

const activeNames = {
    "solana-tools": "Solana Tools",
    "create-token": "Create Token",
    // "add-metadata": "Add Metadata",
    "approve-revoke-delegate": "Approve/Revoke Delegate",
    "burn-tokens": "Burn Tokens",
    "close-token-account": "Close token Account",
    "freeze-thaw-account": "Freeze/Thaw Account",
    "mint-tokens": "Mint Tokens",
    "set-authority": "Set Authority",
    "transfer-tokens": "Transfer Tokens"
}

type ComponentKey = keyof typeof components;

export default function SolanaPage() {
    const router = useRouter();
    const [activeKey, setActiveKey] = useState<ComponentKey>('solana-tools');
    const ActiveComponent = components[activeKey];
    const [network, setNetwork] = useState<string>("devnet");

    return (
        <section className="w-full mx-auto max-w-6xl py-10 md:px-6 lg:px-8 px-4 md:px-6 lg:px-8">
            <div className="flex flex-col gap-1 mb-4">
                <h1 className="text-2xl font-medium">Solana Tools</h1>
                <Breadcrumbs>
                    <BreadcrumbItem onPress={() => router.push('/')}>Home</BreadcrumbItem>
                    <BreadcrumbItem onPress={() => setActiveKey('solana-tools')}>Solana Tools</BreadcrumbItem>
                    {activeKey !== 'solana-tools' && <BreadcrumbItem >{activeNames[activeKey]}</BreadcrumbItem>}
                </Breadcrumbs>
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-8">
                <div className="order-2 md:order-1 flex-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeKey}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ActiveComponent network={network} onToolSelect={(key: string) => setActiveKey(key as ComponentKey)} />
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="rounded-medium bg-content2 dark:bg-content1 w-full px-4 py-4 md:px-6 md:py-8 lg:w-[300px] lg:flex-none order-1 md:order-2 mb-4 md:mb-0">
                    <SolanaWallet updateNetwork={setNetwork} />
                </div>
            </div>
        </section>
    )
}