import {
    Keypair,
    Transaction,
} from "@solana/web3.js";
import { type TokenMetadata } from "@solana/spl-token-metadata";
import { Link } from "@heroui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
// import type { InputProps } from "@heroui/react";
import React, { useState, useRef } from "react";
import {
    Switch,
    Input,
    Textarea,
    Button,
    addToast,
    Checkbox,
    Alert
} from "@heroui/react";
// import { AnimatePresence } from "framer-motion";
import { cn } from "@heroui/react";
import ImageUpload from "../image-upload";
import KeyValueEditor, { KeyValuePair } from "../key-value-editor";
import SwitchCell from "../switch-cell";
import CreateProgress from "./create-progress";
import Confirm, { ConfirmRef } from "./confirm";
import type { CreateFormProps } from './create-token';
import {
    setMintAuthorityIx,
} from '@/lib/solana/basics';
import {
    createAccountIx,
    initializeMetadataPointerIx,
    initializeMintIx,
    getAssociatedTokenAccount,
    createAssociatedTokenAccountIx,
    initializeMetadataIx,
    mintToInstruction
} from '@/lib/solana/extensions';
import { formatWithSpaces, removeSpaces } from "@/utils";

const Token2022Form = React.forwardRef<HTMLDivElement, CreateFormProps>(
    ({ variant = "flat", className, hideTitle, onDone }, ref) => {
        const { publicKey, sendTransaction } = useWallet();
        const { connection } = useConnection();
        const confirmRef = useRef<ConfirmRef>(null);
        const [tokenMint, setTokenMint] = useState<string>('');
        const [revokeMintAuthority, setRevokeMintAuthority] = React.useState<boolean>(false);
        const [revokeFreezeAuthority, setRevokeFreezeAuthority] = React.useState<boolean>(false);
        const [associatedTokenAccount, setAssociatedTokenAccount] = useState<string>('');
        const [signature, setSignature] = useState<string>('');
        const [transactionError, setTransactionError] = useState<string>('');
        const [infos, setInfos] = useState<KeyValuePair[]>([]);

        const [decimals, setDecimals] = React.useState<string>('9');
        const [supply, setSupply] = React.useState<string>('1 000 000 000');
        const [uri, setUri] = React.useState<string>('');
        const [name, setName] = React.useState<string>('');
        const [symbol, setSymbol] = React.useState<string>('');
        const [isUsingMetadataUri, setIsUsingMetadataUri] = React.useState<boolean>(true);
        const [isUsingImageUrl, setIsUsingImageUrl] = React.useState<boolean>(false);
        const [image, setImage] = React.useState<string>('');
        const [description, setDescription] = React.useState<string>('');
        const [attributes, setAttributes] = React.useState<KeyValuePair[]>([]);
        const [loading, setLoading] = useState<boolean>(false);
        const [agreeTerms, setAgreeTerms] = useState<boolean>(false);

        const onSupplyChange = (value: string) => {
            setSupply(formatWithSpaces(removeSpaces(value)));
        }
        const submit = () => {
            if (!decimals || !supply || !name || !symbol) {
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
                    value: name,
                },
                {
                    key: "Token Symbol",
                    value: symbol,
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
            const supplyNumber = Number(removeSpaces(supply));
            setLoading(true);

            const mint = Keypair.generate();
            setTokenMint(mint.publicKey.toBase58());
            // 1 组装metadata
            const metadata: TokenMetadata = {
                mint: mint.publicKey,
                name,
                symbol,
                uri,
                additionalMetadata: attributes.map(ele => [ele.key, ele.value])
            };
            // 2 创建mint帐户
            const createMintIx = await createAccountIx(mint.publicKey, publicKey, metadata, connection)
            // 3 初始化pointer
            const initializePointerIx = await initializeMetadataPointerIx(mint.publicKey, publicKey)
            // 4 初始化mint
            const initializeMint = await initializeMintIx(mint.publicKey, decimalsNumber, publicKey)
            // 5 初始化metadata
            const initializeMetadata = await initializeMetadataIx(mint.publicKey, publicKey, metadata)
            // 6 创建关联token account
            const associatedTokenAccount = await getAssociatedTokenAccount(mint, publicKey, false);
            const createAssociatedTokenAccount = await createAssociatedTokenAccountIx(mint, publicKey, associatedTokenAccount);
            setAssociatedTokenAccount(associatedTokenAccount.toBase58());

            // 7 铸造代币到关联token account
            const mintToIx = await mintToInstruction(mint.publicKey, associatedTokenAccount, publicKey, supplyNumber * 10 ** decimalsNumber);
            const transaction = new Transaction().add(
                createMintIx,
                initializePointerIx,
                initializeMint,
                initializeMetadata,
                // createAssociatedTokenAccount,
                // mintToIx
            );
            if (revokeMintAuthority) {
                // 8 撤销铸币权限
                const revokeMintIx = await setMintAuthorityIx(mint, publicKey, 'mint', null);
                transaction.add(revokeMintIx);
            }
            if (revokeFreezeAuthority) {
                // 9 撤销冻结权限
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
        return (
            <>
                <Confirm infos={infos} ref={confirmRef} confirmText="Let's Go" onConfirm={() => createToken()} />
                {!loading ? (
                    <div ref={ref} className={cn("flex flex-col gap-4", className)}>
                        {isUsingMetadataUri ? (
                            <Alert hideIcon color="warning" description="Sign-in is optional, but your created token details—such as token address and transaction signatures—won’t be saved." title="Sign-in Recommended" variant="faded" />
                        ) : (
                            <Alert hideIcon color="danger" description="Sign-in is required before you can upload images or files." title="Sign-in Required" variant="faded" />
                        )}
                        {!hideTitle && <span className="text-foreground-500 relative">Token Information</span>}
                        <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
                            <Input
                                isRequired
                                label="Token Name (Max 30)"
                                labelPlacement="outside"
                                placeholder="Enter your token name"
                                description="The name of the token."
                                maxLength={30}
                                value={name}
                                onValueChange={(value) => setName(value)}
                                variant={variant}
                                validate={(value) => {
                                    if (!value || value.length > 30) {
                                        return "Name must be 30 characters or less";
                                    }
                                    return null;
                                }}
                            />
                            <Input
                                isRequired
                                label="Token Symbol (Max 10)"
                                labelPlacement="outside"
                                description="The symbol of the token."
                                placeholder="SOL"
                                maxLength={10}
                                value={symbol}
                                onValueChange={(value) => setSymbol(value)}
                                variant={variant}
                                validate={(value) => {
                                    if (!value || value.length > 10) {
                                        return "Symbol must be 10 characters or less";
                                    }
                                    return null;
                                }}
                            />
                        </div>
                        <Input
                            isRequired
                            label="Decimals"
                            labelPlacement="outside"
                            errorMessage="Decimals must be a integer between one to nine"
                            placeholder="9"
                            description="The number of decimal places to use for the token."
                            maxLength={1}
                            value={decimals}
                            pattern="^[1-9]"
                            onValueChange={(value) => setDecimals(value)}
                            variant={variant}
                        />
                        <Input
                            isRequired
                            label="Supply"
                            labelPlacement="outside"
                            errorMessage="Supply must be a integer"
                            placeholder="1000000000"
                            maxLength={23 - Number(decimals)}
                            description="The total supply of the token."
                            value={supply}
                            onValueChange={(value) => onSupplyChange(value)}
                            variant={variant}
                            pattern="^[\d\s]+$"
                        />
                        <div className="flex flex-wrap justify-between items-center gap-4 sm:flex-nowrap">
                            <p>Upload MetaData Or Enter URI</p>
                            <Switch size="sm" defaultSelected={isUsingMetadataUri} onValueChange={setIsUsingMetadataUri} >Enter URI</Switch>
                        </div>
                        {isUsingMetadataUri ? (
                            <Input
                                isRequired
                                label="URI"
                                labelPlacement="outside"
                                placeholder="https://example.com/token.json"
                                value={uri}
                                onValueChange={(value) => setUri(value)}
                                description="The URI of the token metadata."
                                variant={variant}
                            />
                        ) : (
                            <>
                                <Textarea
                                    isRequired
                                    label="Description"
                                    labelPlacement="outside"
                                    placeholder="Enter a description for the token."
                                    maxLength={255}
                                    value={description}
                                    onChange={(value) => setDescription(String(value))}
                                    variant={variant}
                                />
                                <div className="flex flex-wrap justify-between items-center gap-4 sm:flex-nowrap">
                                    <p>Upload Image Or Enter URL</p>
                                    <Switch size="sm" onValueChange={setIsUsingImageUrl} >Enter URL</Switch>
                                </div>
                                {isUsingImageUrl ? (
                                    <Input
                                        isRequired
                                        label="URL"
                                        labelPlacement="outside"
                                        placeholder="https://example.com/token.png"
                                        value={image}
                                        onChange={(value) => setImage(String(value))}
                                        description="The URI of the token image."
                                        variant={variant}
                                    />
                                ) : (
                                    <ImageUpload />
                                )}
                                <KeyValueEditor title="Attributes" onChange={setAttributes} />
                            </>
                        )}
                        <SwitchCell size="sm" defaultSelected={revokeMintAuthority} onValueChange={(isSelected) => setRevokeMintAuthority(isSelected)} label="Revoke Mint Authority" description="Prevent additional token supply to increase investors trust." />
                        <SwitchCell size="sm" defaultSelected={revokeFreezeAuthority} onValueChange={(isSelected) => setRevokeFreezeAuthority(isSelected)} label="Revoke Freeze Authority" description="Prevent token freezing." />

                        <div className="flex">
                            <Checkbox isSelected={agreeTerms} onValueChange={setAgreeTerms}>
                                I agree to the
                            </Checkbox>
                            <Link href="https://www.makecoin.cc/terms" target="_blank" rel="noopener noreferrer" className="ml-1 underline">terms and conditions</Link>
                        </div>
                        <div className="mt-4 space-y-4">
                            <Button fullWidth color="primary" radius="sm" size="lg" onPress={() => submit()}>
                                Create Token
                            </Button>
                        </div>
                    </div>) : (
                    <CreateProgress transactionSignature={signature} transactionError={transactionError} revokeMintAuthority={revokeMintAuthority} revokeFreezeAuthority={revokeFreezeAuthority} tokenMint={tokenMint} associatedTokenAccount={associatedTokenAccount} onDone={onDone} />
                )}

            </>

        );
    },
);

export default Token2022Form;
Token2022Form.displayName = 'Token2022Form';