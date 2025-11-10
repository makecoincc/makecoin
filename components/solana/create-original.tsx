"use client";
import {
    Keypair,
    Transaction,
} from "@solana/web3.js";
import { Link } from "@heroui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
// import type { InputProps } from "@heroui/react";
import React, { useState, useRef } from "react";
import {
    Input,
    Button,
    addToast,
    Checkbox,
    Alert,
    Form
} from "@heroui/react";
import { cn } from "@heroui/react";
import { KeyValuePair } from "../key-value-editor";
import SwitchCell from "../switch-cell";
import CreateProgress from "./create-progress";
import Confirm, { ConfirmRef } from "./confirm";
// import VSplitStepper from "../VSplitStepper";

import {
    getMintAccountRent,
    createMintAccount,
    initializeMintInstruction,
    getAssociatedTokenAccount,
    createAssociatedTokenAccountIx,
    mintToInstruction,
    setMintAuthorityIx
} from '@/lib/solana/basics';

// export type CreateFormProps = React.HTMLAttributes<HTMLDivElement> & {
//   variant?: InputProps["variant"];
//   hideTitle?: boolean;
//   onDone?: () => void;
// };
import type { CreateFormProps } from './create-token';

const OriginalForm = React.forwardRef<HTMLDivElement, CreateFormProps>(
    ({ variant = "flat", className, hideTitle, onDone }, ref) => {
        const { publicKey, sendTransaction } = useWallet();
        const { connection } = useConnection();
        const confirmRef = useRef<ConfirmRef>(null);
        const [revokeMintAuthority, setRevokeMintAuthority] = React.useState<boolean>(false);
        const [revokeFreezeAuthority, setRevokeFreezeAuthority] = React.useState<boolean>(false);
        const [decimals, setDecimals] = React.useState<string>('9');
        const [supply, setSupply] = React.useState<string>('1000000000');
        const [loading, setLoading] = useState<boolean>(false);
        const [agreeTerms, setAgreeTerms] = useState<boolean>(false);

        const [tokenMint, setTokenMint] = useState<string>('');
        const [associatedTokenAccount, setAssociatedTokenAccount] = useState<string>('');
        const [signature, setSignature] = useState<string>('');
        const [transactionError, setTransactionError] = useState<string>('');
        const [infos, setInfos] = useState<KeyValuePair[]>([]);

        const submit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!decimals || !supply) {
                return;
            }
            if (!agreeTerms) {
                addToast({
                    title: "Terms and Conditions not agreed",
                    description: "Please agree to the terms and conditions to create a token.",
                    color: "danger",
                });
                return;
            }
            if (!publicKey) {
                addToast({
                    title: "Wallet not connected",
                    description: "Please connect your wallet to create a token.",
                    color: "danger",
                });
                return;
            }
            setInfos([
                {
                    key: 'Network',
                    value: 'Devnet'
                },
                {
                    key: "Token Name",
                    value: 'Not set',
                },
                {
                    key: "Token Symbol",
                    value: 'Not set',
                },
                {
                    key: "Decimals",
                    value: decimals.toString(),
                },
                {
                    key: "Supply",
                    value: supply.toString(),
                },
            ]);
            confirmRef.current?.onOpen();
        }

        const createToken = async () => {
            if (!publicKey) {
                return;
            }
            const decimalsNumber = Number(decimals)
            const supplyNumber = Number(supply);
            setLoading(true);
            // 0 生成铸币账户和代币账户密钥对
            const mint = Keypair.generate();
            setTokenMint(mint.publicKey.toBase58());
            // const tokenAccount = Keypair.generate();
            const minRent = await getMintAccountRent(connection);
            // const accountRent = await getTokenAccountRent(connection);
            // 1 创建mint并初始化
            const createMintIx = await createMintAccount(mint, publicKey, minRent);
            const initializeMintIx = await initializeMintInstruction(mint, publicKey, decimalsNumber);
            // 2 创建token account并初始化
            // const createTokenAccountIx = await createTokenAccount(tokenAccount, publicKey, accountRent);
            // const initializeTokenAccountIx = await initializeTokenAccountInstruction(tokenAccount, mint, publicKey);
            // 3 创建关联token account
            const associatedTokenAccount = await getAssociatedTokenAccount(mint, publicKey, false);
            const createAssociatedTokenAccount = await createAssociatedTokenAccountIx(mint, publicKey, associatedTokenAccount);
            setAssociatedTokenAccount(associatedTokenAccount.toBase58());

            // 4 铸造代币到关联token account
            const mintToIx = await mintToInstruction(mint.publicKey, associatedTokenAccount, publicKey, supplyNumber * 10 ** decimalsNumber);

            const transaction = new Transaction().add(
                createMintIx,
                initializeMintIx,
                // createTokenAccountIx,
                // initializeTokenAccountIx,
                createAssociatedTokenAccount,
                mintToIx
            );
            if (revokeMintAuthority) {
                // 5 撤销铸币权限
                const revokeMintIx = await setMintAuthorityIx(mint, publicKey, 'mint', null);
                transaction.add(revokeMintIx);
            }
            if (revokeFreezeAuthority) {
                // 6 撤销冻结权限
                const revokeFreezeIx = await setMintAuthorityIx(mint, publicKey, 'freeze', null);
                transaction.add(revokeFreezeIx);
            }
            try {
                const signature = await sendTransaction(transaction, connection, {
                    signers: [mint],
                });
                console.log('Transaction confirmed:', signature);
                // setTokenAccount(tokenAccount.publicKey.toBase58());
                setSignature(signature);
            } catch (err) {
                setTransactionError(err as string)
                console.error('Transaction failed:', err);
            }
        }

        const isInvalid = React.useMemo(() => {
            if (supply === "") return false;

            return !/^[1-9]\d*$/.test(supply)
        }, [supply]);

        return (
            <>
                <Alert hideIcon color="warning" description="Sign-in is optional, but your created token details—such as token address and transaction signatures—won’t be saved." title="Sign-in Recommended" variant="faded" />
                <Confirm infos={infos} ref={confirmRef} confirmText="Let's Go" onConfirm={() => createToken()} />
                {!loading ? (
                    <Form className={cn("flex flex-col gap-4", className)} onSubmit={submit}>
                        {!hideTitle && <span className="text-foreground-500 relative">Token Information</span>}
                        <Input
                            isRequired
                            label="Decimals"
                            labelPlacement="outside"
                            placeholder="9"
                            description="The number of decimal places to use for the token."
                            maxLength={1}
                            value={decimals}
                            onValueChange={(value) => setDecimals(value)}
                            variant={variant}
                            validate={(value) => {
                                if (!/^[1-9]?$/.test(value)) {
                                    return "Decimals must be a integer between one to nine";
                                }
                                return null;
                            }}
                        />
                        <Input
                            isRequired
                            label="Supply"
                            labelPlacement="outside"
                            errorMessage="Supply must be a integer"
                            placeholder="1000000000"
                            maxLength={15}
                            description="The total supply of the token."
                            value={supply}
                            onValueChange={(value) => setSupply(value)}
                            variant={variant}
                            isInvalid={isInvalid}
                            validate={(value) => {
                                if (!value)
                                    return "Enter initial supply";
                                if (Number(value) <= Number("0"))
                                    return "Supply must be more than 0";
                                return null
                            }}
                        />
                        <SwitchCell size="sm" defaultSelected={revokeMintAuthority} onValueChange={(isSelected) => setRevokeMintAuthority(isSelected)} label="Revoke Mint Authority" description="Prevent additional token supply to increase investors trust." />
                        <SwitchCell size="sm" defaultSelected={revokeFreezeAuthority} onValueChange={(isSelected) => setRevokeFreezeAuthority(isSelected)} label="Revoke Freeze Authority" description="Prevent token freezing." />

                        <div className="flex">
                            <Checkbox isSelected={agreeTerms} onValueChange={setAgreeTerms}>
                                I agree to the
                            </Checkbox>
                            <Link href="https://docs.makecoin.cc/terms" target="_blank" rel="noopener noreferrer" className="ml-1 underline">terms and conditions</Link>
                        </div>
                        <div className="w-full mt-4 space-y-4">
                            <Button fullWidth color="primary" radius="sm" size="lg" type="submit">
                                Create Token
                            </Button>
                        </div>
                    </Form>
                ) : (
                    <CreateProgress transactionSignature={signature} transactionError={transactionError} revokeMintAuthority={revokeMintAuthority} revokeFreezeAuthority={revokeFreezeAuthority} tokenMint={tokenMint} associatedTokenAccount={associatedTokenAccount} onDone={onDone} />
                )}
            </>
        )
    }
)

export default OriginalForm;

OriginalForm.displayName = 'CreateTokenForm';