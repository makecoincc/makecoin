import { Button, addToast } from '@heroui/react';
import { useState } from 'react';
import {
    address,
    airdropFactory,
    createSolanaClient,
    lamports,
} from "gill";
import { Icon } from "@iconify/react";

import { useWallet } from "@solana/wallet-adapter-react";

export default function Airdrop() {
    const [isLoading, setIsLoading] = useState(false);
    const { publicKey } = useWallet();

    const requestAirdrop = async () => {
        if (!publicKey) {
            addToast({
                title: "Error requesting airdrop",
                description: "Please connect your wallet first.",
                color: "danger",
            });
            return;
        }
        setIsLoading(true);
        const devnetClient = `${process.env.NEXT_PUBLIC_DEV_RPC_URL}?api-key=${process.env.HELIUS_KEY}` || "devnet";

        try {
            const { rpc, rpcSubscriptions } = createSolanaClient({
                urlOrMoniker: devnetClient,
            });

            const signature = await airdropFactory({ rpc, rpcSubscriptions })({
                commitment: "confirmed",
                lamports: lamports(100n),
                recipientAddress: address(publicKey?.toBase58()),
            });

            addToast({
                title: "Airdrop successful",
                description: "You have successfully requested an airdrop.",
                color: "success",
                endContent: (
                    <Button
                        size="sm"
                        variant="bordered"
                        isIconOnly
                        onPress={() => {
                            window.open(
                                `https://explorer.solana.com/tx/${signature}?cluster=devnet`
                            );
                        }}
                    >
                        <Icon icon="solar:link-round-angle-linear" width={24} />
                    </Button>
                ),
            });
        } catch (error) {
            console.error(error);
            addToast({
                title: "Error requesting airdrop",
                description: "Please try again.",
                color: "danger",
            });
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <Button
                isLoading={isLoading}
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