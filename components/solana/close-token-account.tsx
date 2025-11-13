'use client';
'use client';
import React, { useState, useEffect } from "react";
import { cn, NumberInput, Autocomplete, AutocompleteItem, Button, addToast, Form } from "@heroui/react";
import type { InputProps } from "@heroui/react";
import { closeAccountInstruction, isValidAddress } from '@/lib/solana/basics';
import { useWallet } from "@solana/wallet-adapter-react";
import { getMint, getAssociatedTokenAddress } from "@solana/spl-token";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";

type CloseTokenAccountProps = React.HTMLAttributes<HTMLFormElement> & {
    variant?: InputProps["variant"];
    onToolSelect?: (key: string) => void;
};

const CloseTokenAccount = React.forwardRef<HTMLFormElement, CloseTokenAccountProps>(
    ({ variant = "flat", className, onToolSelect, ...props }, ref) => {
        const { publicKey, sendTransaction } = useWallet();
        const { connection } = useConnection();
        const [ata, setAta] = useState<PublicKey | undefined>(undefined);
        const [isLoading, setIsLoading] = useState<boolean>(false);
        const [tokenAccounts, setTokenAccounts] = useState<{ key: string, pubkey: PublicKey, mint: string }[]>([]);

        useEffect(() => {
            const fetchTokenAccounts = async () => {
                if (!publicKey) return;

                const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
                    publicKey,
                    { programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA") } // SPL Token Program
                );
                console.log(tokenAccounts);

                const accounts = tokenAccounts.value
                    .filter((accountInfo) => {
                        const parsed = accountInfo.account.data.parsed;
                        return parsed.info.tokenAmount.amount == 0;
                    }).map((accountInfo) => {
                        const parsed = accountInfo.account.data.parsed;
                        return {
                            key: accountInfo.pubkey.toString(),
                            pubkey: accountInfo.pubkey,
                            mint: parsed.info.mint as string,
                        };
                    });

                setTokenAccounts(accounts);
            };

            fetchTokenAccounts();
        }, [publicKey]);

        const fetchATA = async (mint: PublicKey) => {
            if (!publicKey || !mint) return;

            const ataAddress = await getAssociatedTokenAddress(
                mint,     // Token Mint
                publicKey       // Wallet Address
            );

            return ataAddress;
        };
        const selectTokenAccount = async (pubkey: React.Key | null) => {
            console.log(pubkey);
            const account = tokenAccounts.find((account) => account.key === pubkey);
            if (account) {
                const mintAddress = new PublicKey(account.mint);
                const ataAddress = await fetchATA(mintAddress);
                console.log(ataAddress);
                setAta(ataAddress);
            }
        };

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
            if (!ata) {
                addToast({
                    title: "Token account not selected",
                    description: "Please select a token account to close.",
                    color: "danger",
                });
                return;
            }
            const closeAccountIx = await closeAccountInstruction(
                ata as PublicKey,
                publicKey,
                publicKey
            );
            const transaction = new Transaction().add(
                closeAccountIx
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
                {/* <div>{tokenAccounts.map((address) => address.toString()).join(', ')}</div> */}
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
                    defaultItems={tokenAccounts.map((address) => ({ key: address.key, label: address.key }))}
                    label="Search a token"
                    onSelectionChange={(value) => selectTokenAccount(value)}
                >
                    {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                </Autocomplete>
                <div className="mt-4 space-y-4 w-full">
                    <Button fullWidth color="primary" radius="sm" size="lg" type="submit" isLoading={isLoading}>
                        Close token account
                    </Button>
                </div>
            </Form>
        )
    })
export default CloseTokenAccount;

CloseTokenAccount.displayName = 'CloseTokenAccount';