'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Breadcrumbs, BreadcrumbItem, Button } from '@heroui/react';
import confetti from 'canvas-confetti';
import { Icon } from "@iconify/react";

export default function CongratsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tx = searchParams.get('tx');
    const token = searchParams.get('token');

    useEffect(() => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, [tx, token])

    return (
        <section className="w-full mx-auto max-w-6xl py-10 md:px-6 lg:px-8 px-4 md:px-6 lg:px-8">
            <div className="flex justify-between mb-4">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-medium">Solana Tools</h1>
                    <Breadcrumbs>
                        <BreadcrumbItem onPress={() => router.push('/')}>Home</BreadcrumbItem>
                        <BreadcrumbItem onPress={() => router.back()}>Solana Tools</BreadcrumbItem>
                    </Breadcrumbs>
                </div>
            </div>
            <div>
                <main className="container mx-auto flex flex-1 flex-col items-center justify-center overflow-hidden px-8 py-8 lg:py-16">
                    <section className="z-20 flex flex-col items-center justify-center gap-[18px] sm:gap-6">

                        <div className="text-center text-[clamp(40px,10vw,44px)] leading-[1.2] font-bold tracking-tighter sm:text-[64px]">
                            <div className="bg-hero-section-title bg-clip-text text-transparent">
                                Your token <br /> was created successfully.
                            </div>
                        </div>
                        <p className="text-default-500 text-center leading-7 font-normal sm:w-[466px] sm:text-[18px]">
                            Congratulations! Your token is now live on Solana. you can view transaction and token details on Solana Explorer.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row mt-6">
                            <Button color="secondary" variant="bordered" startContent={<Icon icon="solar:link-round-angle-linear" width={24} />} onPress={() => window.open(`https://explorer.solana.com/tx/${tx}?cluster=devnet`)}>
                                Transaction
                            </Button>
                            <Button color="secondary" variant="bordered" startContent={<Icon icon="solar:link-round-angle-linear" width={24} />} onPress={() => window.open(`https://explorer.solana.com/address/${token}?cluster=devnet`)}>
                                View Token
                            </Button>
                            <Button color="primary" variant="bordered" onPress={() => router.push('/solana')}>Got it</Button>
                        </div>
                    </section>
                </main>
            </div>
        </section>
    )
}
