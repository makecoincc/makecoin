
import ChainCard from "@/components/chain-card";
import { useTranslations } from "next-intl";

export default function CoinTools() {
    const t = useTranslations('home');
    const chains = [{
        name: 'Solana',
        status: 1,
        desc: t('solanaDesc'),
    }, {
        name: 'Ethereum',
        status: 0,
        desc: t('ethereumDesc'),
    }, {
        name: 'Unknown',
        status: 0,
        desc: t('unknownDesc'),
    }]
    return (
        <div className="max-w-[1200px] mx-auto px-4 py-20 sm:py-32 md:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 pb-20">
                <h2 className="from-foreground to-foreground-600 w-full max-w-3xl bg-linear-to-br bg-clip-text px-2 text-center text-3xl font-bold tracking-tight text-transparent md:text-5xl">
                    <span className="inline-block md:hidden">{ t("title") }</span>
                    <span className="hidden md:inline-block">{ t("subtitle") }</span>
                </h2>
                <p className="text-default-500 text-center leading-7 font-normal sm:text-[18px]">
                    { t("desc") }
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
