"use client";

import type { CardProps } from "@heroui/react";

import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Listbox, ListboxItem, Progress, Alert, Spinner, Button, CardFooter } from "@heroui/react";
import { Icon } from "@iconify/react";
import { CopyButton } from '../copy-button';
interface CreateProgressProps extends CardProps {
    tokenMint?: string;
    associatedTokenAccount?: string;
    revokeMintAuthority?: boolean;
    revokeFreezeAuthority?: boolean;
    transactionSignature?: string;
    transactionError?: string;
    onDone?: () => void;
}

export default function CreateProgress(props: CreateProgressProps) {
    const { tokenMint, associatedTokenAccount, revokeMintAuthority, revokeFreezeAuthority, transactionSignature, transactionError, onDone, ...CardProps } = props;
    const [percent, setPercent] = useState(0);
    useEffect(() => {
        let percent = 0;
        if (transactionSignature) {
            percent = 100;
        } else if (transactionError) {
            percent = 0;
        } else if (tokenMint) {
            percent = 30;
        }
        setPercent(percent);
    }, [tokenMint, associatedTokenAccount, transactionSignature, transactionError]);
    return (
        <Card {...CardProps} className="py-1 md:py-4">
            <CardHeader className="flex items-center gap-3 px-5 pt-3 pb-0 md:px-10 md:pt-5">
                <div className="from-secondary-300 to-primary-500 flex h-14 w-14 flex-none items-center justify-center rounded-full bg-linear-to-br">
                    <Icon className="text-white" icon="token-branded:solana" width={30} />
                </div>
                <Progress
                    isIndeterminate={!transactionError && percent === 0}
                    showValueLabel
                    classNames={{
                        label: "font-medium",
                        indicator: "bg-linear-to-r from-primary-400 to-secondary-500",
                        value: "text-foreground/60",
                    }}
                    label={transactionError ? "Token creation failed" : (percent === 100 ? "Token creation completed" : "Your token is creating")}
                    value={percent}
                />
            </CardHeader>
            <CardBody className="px-2 pt-3 sm:px-3 md:px-6">
                <div className="p-4">
                    {transactionError && (
                        <Alert
                            hideIconWrapper
                            color="danger"
                            description={transactionError}
                            title="Creation Failed"
                            variant="bordered"
                        />
                    )}
                    {(percent < 60 && !transactionError) && (
                        <Alert
                            hideIconWrapper
                            color="warning"
                            description="To proceed, please review and approve the transaction in your connected wallet. This step is required to complete the action."
                            title="Confirm in Your Wallet"
                            variant="bordered"
                        />
                    )}
                </div>
                <Listbox
                    hideSelectedIcon
                    aria-label="Token creation progress"
                    variant="flat"
                // onAction={(selectedKey) => alert(selectedKey)}
                >
                    <ListboxItem
                        key="mint"
                        classNames={{
                            base: "w-full px-2 md:px-4 min-h-[70px] gap-3",
                            title: "text-medium font-medium",
                            description: "text-small text-wrap",
                        }}
                        description={<p className="text-default-500">{tokenMint || 'A mint account uniquely represents a token on Solana and stores its global metadata.'}</p>}
                        endContent={
                            <div className="flex flex-none">
                                {transactionError ? <Icon className="text-danger" icon="solar:close-circle-linear" width={24} /> : (
                                    tokenMint ? (
                                        <CopyButton fullText={tokenMint} />
                                    ) : (
                                        <Spinner />
                                    ))}
                            </div>
                        }
                        startContent={
                            <div className="item-center rounded-medium border-divider flex border p-2">
                                <Icon className="text-secondary" icon="mdi:database-plus" width={24} />
                            </div>
                        }
                        title="Create a Token Mint"
                    />
                    <ListboxItem
                        key="ata"
                        classNames={{
                            base: "w-full px-2 md:px-4 min-h-[70px] gap-3",
                            title: "text-medium font-medium",
                            description: "text-small text-wrap",
                        }}
                        description={<p className="text-default-500">{associatedTokenAccount || 'Associated Token Account is the "default" token account for a specific mint and owner.'}</p>}
                        endContent={
                            <div className="flex flex-none">
                                {transactionError ? <Icon className="text-danger" icon="solar:close-circle-linear" width={24} /> : (
                                    associatedTokenAccount ? (
                                        <CopyButton fullText={associatedTokenAccount} />
                                    ) : (
                                        <Spinner />
                                    ))}
                            </div>
                        }
                        startContent={
                            <div className="item-center rounded-medium border-divider flex border p-2">
                                <Icon className="text-secondary" icon="mdi:link-variant" width={24} />
                            </div>
                        }
                        title="Create Associated Token Account"
                    />
                    <ListboxItem
                        key="mint-to"
                        classNames={{
                            base: "w-full px-2 md:px-4 min-h-[70px] gap-3",
                            title: "text-medium font-medium",
                            description: "text-small text-wrap",
                        }}
                        description={<p className="text-default-500">Minting creates new units of a token</p>}
                        endContent={
                            <div className="flex flex-none">
                                {transactionError ? <Icon className="text-danger" icon="solar:close-circle-linear" width={24} /> : (
                                    transactionSignature ? (
                                        <Icon className="text-secondary" icon="solar:check-circle-bold" width={30} />
                                    ) : (
                                        <Spinner />
                                    ))}
                            </div>
                        }
                        startContent={
                            <div className="item-center rounded-medium border-divider flex border p-2">
                                <Icon className="text-secondary" icon="mdi:hammer-wrench" width={24} />
                            </div>
                        }
                        title="Mint Tokens"
                    />
                    {revokeMintAuthority ? (
                        <ListboxItem
                            key="revoke-mint"
                            classNames={{
                                base: "w-full px-2 md:px-4 min-h-[70px] gap-3",
                                title: "text-medium font-medium",
                                description: "text-small text-wrap",
                            }}
                            description={<p className="text-default-500">Revoked after initial supply is created to create a fixed supply token.</p>}
                            endContent={
                                <div className="flex flex-none">
                                    {transactionError ? <Icon className="text-danger" icon="solar:close-circle-linear" width={24} /> : (
                                        transactionSignature ? (
                                            <Icon className="text-secondary" icon="solar:check-circle-bold" width={30} />
                                        ) : (
                                            <Spinner />
                                        ))}
                                </div>
                            }
                            startContent={
                                <div className="item-center rounded-medium border-divider flex border p-2">
                                    <Icon className="text-secondary" icon="mdi:shield-key" width={24} />
                                </div>
                            }
                            title="Revoke Mint Authority"
                        />
                    ) : null}
                    {revokeFreezeAuthority ? (
                        <ListboxItem
                            key="revoke-freeze"
                            classNames={{
                                base: "w-full px-2 md:px-4 min-h-[70px] gap-3",
                                title: "text-medium font-medium",
                                description: "text-small text-wrap",
                            }}
                            description={<p className="text-default-500">Revoked to guarantee users their tokens cannot be frozen.</p>}
                            endContent={
                                <div className="flex flex-none">
                                    {transactionError ? <Icon className="text-danger" icon="solar:close-circle-linear" width={24} /> : (
                                        transactionSignature ? (
                                            <Icon className="text-secondary" icon="solar:check-circle-bold" width={30} />
                                        ) : (
                                            <Spinner />
                                        ))}
                                </div>
                            }
                            startContent={
                                <div className="item-center rounded-medium border-divider flex border p-2">
                                    <Icon className="text-secondary" icon="mdi:shield-key" width={24} />
                                </div>
                            }
                            title="Revoke Freeze Authority"
                        />
                    ) : null}

                </Listbox>
            </CardBody>
            {transactionError && (
                <CardFooter className="justify-end gap-2">
                    <Button color="danger" fullWidth onPress={onDone}>
                        Try Again
                    </Button>
                </CardFooter>
            )}
            {percent === 100 && (
                <CardFooter className="justify-end gap-2">
                    <Button color="secondary" fullWidth startContent={<Icon icon="solar:link-round-angle-linear" width={24} />} onPress={() => window.open(`https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`)}>
                        View On Explorer
                    </Button>
                    <Button color="primary" fullWidth onPress={onDone}>Got it</Button>

                </CardFooter>
            )}
        </Card>
    );
}
