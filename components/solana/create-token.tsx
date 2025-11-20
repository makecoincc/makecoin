'use client';
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { InputProps } from "@heroui/react";
import {
    Link,
    Input,
    Button,
    addToast,
    Checkbox,
    Alert,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
} from "@heroui/react";
import { cn } from "@heroui/react";
import { formatWithSpaces, removeSpaces } from "@/utils";
import {
    createFungible,
    mplTokenMetadata,
} from '@metaplex-foundation/mpl-token-metadata'
import {
    createTokenIfMissing,
    findAssociatedTokenPda,
    getSplAssociatedTokenProgramId,
    mintTokensTo,
} from '@metaplex-foundation/mpl-toolbox'
import {
    generateSigner,
    percentAmount,
} from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { useWallet } from "@solana/wallet-adapter-react";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
type CreateTokenProps = React.HTMLAttributes<HTMLFormElement> & {
    variant?: InputProps["variant"];
    onDone?: (tokenAddress: string) => void;
    network: string;
};

const CreateToken = React.forwardRef<HTMLFormElement, CreateTokenProps>(
    ({ variant = "flat", className, network }, ref) => {
        const router = useRouter();
        const { publicKey, wallet } = useWallet();
        const [decimals, setDecimals] = React.useState<string>('9');
        const [supply, setSupply] = React.useState<string>('1 000 000 000');
        const [uri, setUri] = React.useState<string>('');
        const [name, setName] = React.useState<string>('');
        const [symbol, setSymbol] = React.useState<string>('');
        const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
        const { isOpen, onOpen, onOpenChange } = useDisclosure();
        const [loading, setLoading] = useState<boolean>(false);
        const onSupplyChange = (value: string) => {
            setSupply(formatWithSpaces(removeSpaces(value)));
        }
        const createAndMintTokens = async () => {
            if (!wallet) return;
            const umi = createUmi(`${process.env.NEXT_PUBLIC_DEV_RPC_URL}?api-key=${process.env.NEXT_PUBLIC_HELIUS_KEY}`)
                .use(mplTokenMetadata())

            umi.use(walletAdapterIdentity(wallet.adapter));

            // Creating the mintIx

            const mintSigner = generateSigner(umi);

            const createFungibleIx = createFungible(umi, {
                mint: mintSigner,
                name,
                symbol,
                uri: uri, // we use the `metadataUri` variable we created earlier that is storing our uri.
                sellerFeeBasisPoints: percentAmount(0),
                decimals: Number(decimals), // set the amount of decimals you want your token to have.
            });

            // This instruction will create a new Token Account if required, if one is found then it skips.

            const createTokenIx = createTokenIfMissing(umi, {
                mint: mintSigner.publicKey,
                owner: umi.identity.publicKey,
                ataProgram: getSplAssociatedTokenProgramId(umi),
            });

            // The final instruction (if required) is to mint the tokens to the token account in the previous ix.

            const mintTokensIx = mintTokensTo(umi, {
                mint: mintSigner.publicKey,
                token: findAssociatedTokenPda(umi, {
                    mint: mintSigner.publicKey,
                    owner: umi.identity.publicKey,
                }),
                amount: BigInt(removeSpaces(supply)) * BigInt(10 ** Number(decimals)),
            });

            // The last step is to send the ix's off in a transaction to the chain.
            // Ix's here can be omitted and added as needed during the transaction chain.
            // If for example you just want to create the Token without minting
            // any tokens then you may only want to submit the `createToken` ix.

            console.log("Sending transaction")
            const tx = await createFungibleIx
                .add(createTokenIx)
                .add(mintTokensIx)
                .sendAndConfirm(umi);

            // finally we can deserialize the signature that we can check on chain.
            const signature = base58.deserialize(tx.signature)[0];

            // Log out the signature and the links to the transaction and the NFT.
            // Explorer links are for the devnet chain, you can change the clusters to mainnet.
            console.log('\nTransaction Complete')
            console.log('View Transaction on Solana Explorer')
            console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`)
            console.log('View Token on Solana Explorer')
            console.log(`https://explorer.solana.com/address/${mintSigner.publicKey}?cluster=devnet`)
            router.push(`/solana/congrats?tx=${signature}&token=${mintSigner.publicKey}`)
        };
        const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!agreeTerms) {
                addToast({
                    title: "Terms and Conditions not agreed",
                    description: "Please agree to the terms and conditions.",
                    color: "danger"
                });
                return;
            }
            if (!publicKey) {
                addToast({
                    title: "Wallet not connected",
                    description: "Please connect your wallet.",
                    color: "danger"
                });
                return;
            }
            onOpen();
        }
        const createToken = async () => {
            if (!publicKey) return;

            setLoading(true)
            try {
                await createAndMintTokens()
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        return (
            <>
                <Modal
                    backdrop="opaque"
                    classNames={{
                        body: "py-6",
                        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                        header: "border-b-[1px] border-[#292f46]",
                        footer: "border-t-[1px] border-[#292f46]",
                        closeButton: "hover:bg-white/5 active:bg-white/10",
                    }} isOpen={isOpen} shouldBlockScroll={false} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <ModalBody>
                                <ModalHeader className="flex-col items-center gap-1 px-0 text-center">
                                    <h1 className="text-xl">Confirm Information</h1>
                                    <p className="text-small text-default-500 font-normal">
                                        Once you confirm, you cannot change the token information.
                                    </p>
                                </ModalHeader>
                                <dl className="flex flex-col gap-4 py-4">
                                    <div className="flex justify-between">
                                        <dt className="text-default-500">Name</dt>
                                        <dd className="text-default-700 font-semibold">{name}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-default-500">Symbol</dt>
                                        <dd className="text-default-700 font-semibold">{symbol}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-default-500">Decimals</dt>
                                        <dd className="text-default-700 font-semibold">{decimals}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-default-500 font-semibold">Network</dt>
                                        <dd className="text-default-700 font-semibold">{network}</dd>
                                    </div>
                                </dl>
                                <Divider />
                                <div className="mt-4">
                                    <Button fullWidth color="primary" radius="sm" size="lg" onPress={() => {
                                        createToken()
                                        onClose()
                                    }}>
                                        Let's Go!
                                    </Button>
                                </div>
                            </ModalBody>
                        )}
                    </ModalContent>
                </Modal>
                <form ref={ref} className={cn("flex flex-col gap-4", className)} onSubmit={onSubmit}>
                    <span className="text-foreground-500 relative">Token Information</span>
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
                    <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
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
                    </div>

                    <Input
                        isRequired
                        type="url"
                        pattern="https://.*"
                        label="URI"
                        labelPlacement="outside"
                        placeholder="https://example.com/token.json"
                        value={uri}
                        onValueChange={(value) => setUri(value)}
                        description="The URI of the token metadata. https only."
                        variant={variant}
                    />
                    <div className="flex">
                        <Checkbox isSelected={agreeTerms} onValueChange={setAgreeTerms}>
                            I agree to the
                        </Checkbox>
                        <Link href="https://www.makecoin.cc/terms" target="_blank" rel="noopener noreferrer" className="ml-1 underline">terms and conditions</Link>
                    </div>
                    <div className="mt-4 space-y-4">
                        <Button fullWidth color="primary" isLoading={loading} radius="sm" size="lg" type="submit">
                            Create Token
                        </Button>
                    </div>
                </form>
            </>
        )
    })

export default CreateToken;

CreateToken.displayName = 'CreateToken';