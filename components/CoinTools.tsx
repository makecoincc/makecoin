import Spotlight from "@/components/Spotlight";
import Image from "next/image";
import { Logo } from "@/components/Logo";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    type CardProps,
} from "@heroui/react";

const chains = ['Ethereum', 'Solana', 'Makecoin']

export default function CoinTools(props: CardProps) {
    return (
        <Spotlight className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
            {chains.map((chain) => (
                <a  key={chain}
                    className="group/card relative h-full overflow-hidden rounded-2xl w-[420px] bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
                    href="#0"
                >
                    <Card
                        className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50"
                        {...props}
                    >
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                { chain && <Image src={`https://img.makecoin.cc/${chain.toLowerCase()}.png`} alt={chain} width={40} height={40} />}
                                <p className="text-large font-medium text-white">{chain}</p>
                            </div>
                        </CardHeader>
                        <CardBody className="px-3">
                            <div className="flex flex-col gap-2 px-2">
                                <p className="text-large font-medium text-white/80">Learn from the best</p>
                                <p className="text-small text-white/60">
                                    Unlock the full power of Acme! Gain expertise and insights from top organizations
                                    through guided tutorials, boosting productivity, enhancing security, and enabling
                                    seamless collaboration.
                                </p>
                            </div>
                        </CardBody>
                        <CardFooter className="justify-end gap-2">
                            <Button fullWidth className="border-small border-white/20 bg-white/10 text-white">
                                Get tickets now
                            </Button>
                        </CardFooter>
                    </Card>
                </a>
            ))}


        </Spotlight>
    );
}
