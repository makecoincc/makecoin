'use client';
import React, { useState } from "react";
import { cn, NumberInput, Input, Button, addToast, Form } from "@heroui/react";
import type { InputProps } from "@heroui/react";
import { mintToInstruction, isValidAddress } from '@/lib/solana/basics';
import { useWallet } from "@solana/wallet-adapter-react";
import { getMint } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";

type MintTokensProps = React.HTMLAttributes<HTMLFormElement> & {
    variant?: InputProps["variant"];
    onToolSelect?: (key: string) => void;
};

const MintTokens = React.forwardRef<HTMLFormElement, MintTokensProps>(
    ({ variant = "flat", className, onToolSelect, ...props }, ref) => {
        const { publicKey, sendTransaction } = useWallet();
        const { connection } = useConnection();
        const [mint, setMint] = useState<string>("");
        const [amount, setAmount] = useState<number>(0);
        const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const data = Object.fromEntries(new FormData(e.currentTarget));
            if (!publicKey) {
                addToast({
                    title: "Wallet not connected",
                    description: "Please connect your wallet to create a token.",
                    color: "danger",
                });
                return;
            }
            const mintAddress = new PublicKey(mint);
            const mintInfo = await getMint(connection, mintAddress);
            console.log(mintInfo)
            // const mintToIx = await mintToInstruction(mint, associatedTokenAccount, publicKey, supply * 10 ** mintInfo.decimals);

        }
        return (
            <Form className={cn("flex flex-col gap-4 py-8", className)} onSubmit={onSubmit}>
                <Input
                    isRequired
                    label="Mint address"
                    labelPlacement="outside"
                    placeholder="Enter mint address"
                    value={mint}
                    variant={variant}
                    onValueChange={setMint}
                    validate={(value) => {
                        return isValidAddress(value) ? true : "Invalid mint address";
                    }}
                />
                <NumberInput
                    isRequired
                    label="Token amount"
                    labelPlacement="outside"
                    placeholder="Enter token amount"
                    value={amount}
                    variant={variant}
                    onValueChange={setAmount}
                />
                <div className="mt-4 space-y-4 w-full">
                    <Button fullWidth color="primary" radius="sm" size="lg" type="submit">
                        Mint tokens
                    </Button>
                </div>
            </Form>
        )
    })

export default MintTokens;