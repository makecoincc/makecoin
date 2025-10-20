import Spotlight from "@/components/Spotlight";
import Image from "next/image";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    type CardProps,
} from "@heroui/react";

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

export default function CoinTools(props: CardProps) {
    const onPress = () => {
        console.log('onPress')
    }
    return (
        <div className="max-w-[1200px] mx-auto pt-12">
            <Spotlight className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
                {chains.map((chain) => (
                    <div key={chain.name}
                        className="group/card relative h-full overflow-hidden rounded-2xl w-max-[420px] bg-white dark:bg-gray-800 p-px before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
                    >
                        <Card
                            className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-white/95 dark:bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-white/60 after:via-gray-100/40 after:to-white/60 dark:after:from-gray-900/50 dark:after:via-gray-800/25 dark:after:to-gray-900/50"
                            {...props}
                        >
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    {chain && <Image src={`https://img.makecoin.cc/${chain.name.toLowerCase()}.png`} alt={chain.name} width={40} height={40} style={{width: 'auto', height: 'auto'}}/>}
                                    <p className="text-large font-medium dark:text-white">{chain.name}</p>
                                </div>
                            </CardHeader>
                            <CardBody className="px-3">
                                <div className="flex flex-col gap-2 px-2">
                                    <p className="text-large font-medium dark:text-white/80">{chain.name} Tools</p>
                                    <p className="text-small dark:text-white/60">
                                        {chain.desc}
                                    </p>
                                </div>
                            </CardBody>
                            <CardFooter className="justify-end gap-2">
                                <Button fullWidth className="z-99 border-small dark:border-white/20 bg-white/10 dark:text-white" onPress={onPress}>
                                    Learn More
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                ))}


            </Spotlight>
        </div>
    );
}
