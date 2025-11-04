// import {
//     type CardProps,
// } from "@heroui/react";
import ChainCard from "@/components/chain-card";

const chains = [{
    name: 'Ethereum',
    desc: 'Ethereum is a decentralized, open-source blockchain platform that enables developers to build and deploy smart contracts and decentralized applications (DApps).',
}, {
    name: 'Solana',
    desc: 'Solana is a high-performance blockchain platform that enables fast and secure transactions. It uses a unique consensus mechanism called Proof of History (PoH) to achieve high throughput and low latency.',
}, {
    name: 'Unknown',
    desc: 'Unknown chain. Please contact us for more information.',
}]

export default function CoinTools() {
    // const onPress = () => {
    //     console.log('onPress')
    // }
    return (
        <div className="max-w-[1200px] mx-auto px-4 py-20 sm:py-32 md:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 pb-20">
                <h2 className="from-foreground to-foreground-600 w-full max-w-3xl bg-linear-to-br bg-clip-text px-2 text-center text-3xl font-bold tracking-tight text-transparent md:text-5xl">
                    <span className="inline-block md:hidden">Make Your Coin</span>
                    <span className="hidden md:inline-block">Make Coin In One Click</span>
                </h2>
                <p className="text-default-500 text-center leading-7 font-normal sm:text-[18px]">
                    MAKE COIN makes launching your own digital currency radically simple. Zero fees. Fully open-source. No gatekeepers. Just pure crypto freedom—accessible to anyone, anywhere.
                </p>
            </div>
            <div className="flex mx-auto grid max-w-sm gap-6 lg:max-w-none lg:grid-cols-3">
                {chains.map((chain) => (
                    <ChainCard key={chain.name} chain={chain} />
                ))}
            </div>
        </div>
    );
}
