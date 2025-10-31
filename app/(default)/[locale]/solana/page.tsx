'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from 'framer-motion';
import ActionCard from "@/components/ActionCard";
import SolanaWallet from "@/components/Solana/SolanaWallet";
import CreateToken from "@/components/Solana/CreateToken";
// import { PublicKey } from "@solana/web3.js";
import { Breadcrumbs, BreadcrumbItem } from '@heroui/react';
const solanaTools = [
    { title: "Create Token", description: "Create an SPL Token", key: "create-token" },
    { title: "Transfer Tokens", description: "Transfer tokens between token accounts.", key: "transfer-tokens" },
    { title: "Approve/Revoke Delegate", description: "Approve/Revoke delegates for a token account.", key: "approve-revoke-delegate" },
    { title: "Set Authority", description: "Set authority for mints or token accounts.", key: "set-authority" },
    { title: "Burn Tokens", description: "Burn tokens.", key: "burn-tokens" },
    { title: "Sync Native", description: "Convert native SOL to wrapped SOL.", key: "sync-native" },
    { title: "Close Token Account", description: "Close token accounts.", key: "close-token-account" },
    { title: "Freeze/Thaw Account", description: "Freeze/Thaw token accounts.", key: "freeze-thaw-account" },
]

interface SolanaToolsProps {
    onToolSelect?: (key: string) => void;
}

const SolanaTools = ({ onToolSelect }: SolanaToolsProps) => (
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
}

const activeNames = {
    "solana-tools": "Solana Tools",
    "create-token": "Create Token",
}

type ComponentKey = keyof typeof components;

export default function SolanaPage() {
    const router = useRouter();
    const [activeKey, setActiveKey] = useState<ComponentKey>('solana-tools');
    const ActiveComponent = components[activeKey];

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
                            <ActiveComponent onToolSelect={(key) => setActiveKey(key as ComponentKey)} />
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="rounded-medium bg-content2 dark:bg-content1 w-full px-4 py-4 md:px-6 md:py-8 lg:w-[300px] lg:flex-none order-1 md:order-2 mb-4 md:mb-0">
                    <SolanaWallet />
                </div>
            </div>
        </section>
    )
}