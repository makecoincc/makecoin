'use client';
import React, { useState, useEffect } from "react";
import { cn, NumberInput, Autocomplete, AutocompleteItem, Button, addToast, Form } from "@heroui/react";
import type { InputProps } from "@heroui/react";
import { mintToInstruction, isValidAddress } from '@/lib/solana/basics';
import { useWallet } from "@solana/wallet-adapter-react";
import { getMint, getAssociatedTokenAddress } from "@solana/spl-token";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";

type MintTokensProps = React.HTMLAttributes<HTMLFormElement> & {
    variant?: InputProps["variant"];
    onToolSelect?: (key: string) => void;
};

const MintTokens = React.forwardRef<HTMLFormElement, MintTokensProps>(
    ({ variant = "flat", className, onToolSelect, ...props }, ref) => {
        const { publicKey, sendTransaction } = useWallet();
        const { connection } = useConnection();
        const [mint, setMint] = useState<PublicKey | null>(null);
        const [amount, setAmount] = useState<number>(0);
        const [ata, setAta] = useState<PublicKey | null>(null);
        const [isLoading, setIsLoading] = useState<boolean>(false);
        const [mintAddresses, setMintAddresses] = useState<string[]>([]);

        useEffect(() => {
            const fetchTokenMints = async () => {
                if (!publicKey) return;

                const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
                    publicKey,
                    { programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA") } // SPL Token Program
                );
                console.log(tokenAccounts);

                const mints = new Set(tokenAccounts.value
                    .map((accountInfo) => {
                        const parsed = accountInfo.account.data.parsed;
                        return parsed.info.mint;
                    }));

                setMintAddresses(Array.from(mints));
            };

            fetchTokenMints();
        }, [publicKey]);

        useEffect(() => {
            const fetchATA = async () => {
                if (!publicKey || !mint) return;

                const ataAddress = await getAssociatedTokenAddress(
                    mint,     // Token Mint
                    publicKey       // Wallet Address
                );

                setAta(ataAddress);
            };

            fetchATA();
        }, [publicKey, mint]);

        const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            // const data = Object.fromEntries(new FormData(e.currentTarget));
            if (!publicKey) {
                addToast({
                    title: "Wallet not connected",
                    description: "Please connect your wallet to create a token.",
                    color: "danger",
                });
                return;
            }
            const mintAddress = mint as PublicKey;
            const mintInfo = await getMint(connection, mintAddress);
            console.log(mintInfo)
            const mintToIx = await mintToInstruction(mint as PublicKey, ata as PublicKey, publicKey, amount * 10 ** mintInfo.decimals);
            const transaction = new Transaction().add(
                mintToIx
            );
            try {
                setIsLoading(true);
                const signature = await sendTransaction(transaction, connection, {
                    signers: [],
                });
                console.log('Transaction confirmed:', signature);
                setIsLoading(false);
            } catch (err) {
                console.error('Transaction failed:', err);
                setIsLoading(false);
            }
        }
        return (
            <Form className={cn("flex flex-col gap-4 py-8", className)} onSubmit={onSubmit}>
                {/* <div>{mintAddresses.map((address) => address.toString()).join(', ')}</div> */}
                {/* <Input
                    isRequired
                    label="Mint address"
                    labelPlacement="outside"
                    placeholder="Enter mint address"
                    value={mint?.toString()}
                    variant={variant}
                    onValueChange={(value) => setMint(new PublicKey(value))}
                    validate={(value) => {
                        return isValidAddress(value) ? true : "Invalid mint address";
                    }}
                /> */}
                <Autocomplete
                    allowsCustomValue
                    labelPlacement="outside"
                    variant={variant}
                    defaultItems={mintAddresses.map((address) => ({ key: address, label: address }))}
                    label="Search a token"
                    onValueChange={(value) => setMint(new PublicKey(value))}
                    >
                    {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                </Autocomplete>
                <NumberInput
                    isRequired
                    label="Token amount"
                    labelPlacement="outside"
                    placeholder="Enter token amount"
                    value={amount}
                    variant={variant}
                    onValueChange={setAmount}
                    validate={(value) => {
                        return value > 0 ? true : "Token amount must be greater than 0";
                    }}
                />
                <div className="mt-4 space-y-4 w-full">
                    <Button fullWidth color="primary" radius="sm" size="lg" type="submit" isLoading={isLoading}>
                        Mint tokens
                    </Button>
                </div>
            </Form>
        )
    })

export default MintTokens;