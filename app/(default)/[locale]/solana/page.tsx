'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from "next/dynamic";
import ActionCard from "@/components/action-card";
import CreateToken from "@/components/solana/create-token";
import AddMetadata from "@/components/solana/add-metadata";
import ApproveRevokeDelegate from "@/components/solana/approve-revoke-delegate";
import BurnTokens from "@/components/solana/butn-tokens";
import CloseAccount from "@/components/solana/close-token-account";
import FreezeThawAccount from "@/components/solana/freeze-thaw-account";
import MintTokens from "@/components/solana/mint-tokens";
import SetAuthority from "@/components/solana/set-authority";
import TransferTokens from "@/components/solana/transfer-tokens";
import { Breadcrumbs, BreadcrumbItem, Badge, addToast } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { useWallet } from "@solana/wallet-adapter-react";

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

interface SolanaToolsProps {
    onToolSelect?: (key: string) => void;
    network: string;
}

const SolanaTools = ({ onToolSelect, network }: SolanaToolsProps) => {
    const t = useTranslations("solana");
    const solanaTools = [
        { title: t("createToken"), description: t("createTokenDesc"), key: "create-token", color:"primary" },
        { title: t("addMetadata"), description: t("addMetadataDesc"), key: "add-metadata", color:"warning" },
        { title: t("mintTokens"), description: t("mintTokensDesc"), key: "mint-tokens", color:"warning" },
        { title: t("transferTokens"), description: t("transferTokensDesc"), key: "transfer-tokens", color:"warning" },
        { title: t("approveRevokeDelegate"), description: t("approveRevokeDelegateDesc"), key: "approve-revoke-delegate", color:"warning" },
        { title: t("setAuthority"), description: t("setAuthorityDesc"), key: "set-authority", color:"warning" },
        { title: t("burnTokens"), description: t("burnTokensDesc"), key: "burn-tokens", color:"warning" },
        { title: t("closeTokenAccount"), description: t("closeTokenAccountDesc"), key: "close-token-account", color:"warning" },
        { title: t("freezeThawAccount"), description: t("freezeThawAccountDesc"), key: "freeze-thaw-account", color:"warning" },
    ]
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {solanaTools.map((tool, index) => (
                <ActionCard
                    key={index}
                    title={tool.title}
                    description={tool.description}
                    color={tool.color as "secondary" | "warning" | "primary" | "danger" | undefined}
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
}

const components = {
    "index": SolanaTools,
    "create-token": CreateToken,
    "add-metadata": AddMetadata,
    "approve-revoke-delegate": ApproveRevokeDelegate,
    "burn-tokens": BurnTokens,
    "close-token-account": CloseAccount,
    "freeze-thaw-account": FreezeThawAccount,
    "mint-tokens": MintTokens,
    "set-authority": SetAuthority,
    "transfer-tokens": TransferTokens,
}



type ComponentKey = keyof typeof components;

export default function SolanaPage() {
    const t = useTranslations("solana");
    const { publicKey, connected } = useWallet();
    const router = useRouter();
    const [activeKey, setActiveKey] = useState<ComponentKey>('index');
    const ActiveComponent = components[activeKey];
    const [network, setNetwork] = useState<string>("devnet");
    const activeNames = {
        "index": t("solanaTools"),
        "create-token": t("createToken"),
        "add-metadata": t("addMetadata"),
        "approve-revoke-delegate": t("approveRevokeDelegate"),
        "burn-tokens": t("burnTokens"),
        "close-token-account": t("closeTokenAccount"),
        "freeze-thaw-account": t("freezeThawAccount"),
        "mint-tokens": t("mintTokens"),
        "set-authority": t("setAuthority"),
        "transfer-tokens": t("transferTokens"),
    }
    const onToolSelect = (key: ComponentKey) => {
        if (key === 'index' || key === 'create-token') {
            setActiveKey(key);
            return;
        }
        addToast({
            title: t("notSupported"),
            description: t("notSupportedDesc"),
            color: "warning",
        })
    }

    const shorten = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;
    return (
        <section className="w-full mx-auto max-w-6xl py-10 md:px-6 lg:px-8 px-4 md:px-6 lg:px-8">
            <div className="flex justify-between mb-4">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-medium">{activeNames[activeKey]}</h1>
                    <Breadcrumbs className="hidden md:block">
                        <BreadcrumbItem onPress={() => router.push('/')}>{t("home")}</BreadcrumbItem>
                        <BreadcrumbItem onPress={() => setActiveKey('index')}>{t("solanaTools")}</BreadcrumbItem>
                        {activeKey !== 'index' && <BreadcrumbItem >{activeNames[activeKey]}</BreadcrumbItem>}
                    </Breadcrumbs>
                </div>
                <div className="flex items-center gap-2">
                    <Badge color="warning" content={t(network)}>
                        <WalletMultiButton>
                            { connected ? shorten(publicKey?.toBase58() || "") : t("connectWallet")}
                        </WalletMultiButton>
                    </Badge>
                </div>
            </div>
            <div className="">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeKey}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ActiveComponent network={network} onToolSelect={(key: string) => onToolSelect(key as ComponentKey)} />
                    </motion.div>
                </AnimatePresence>

            </div>
        </section>
    )
}