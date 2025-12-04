import Link from "next/link";
import cn from "classnames";
import { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import styles from "./Wallet.module.scss";
import Icon from "@/components/Icon";
import { useShortenAddress } from "@/hooks";
import useTokenPriceStore from '@/store/useTokenPriceStore';
import { formatBalance, formatUSD } from "@/utils/formater";
// import { WalletBalance } from "@/components/WalletBalance";
type WalletProps = {
    onDisconnect: () => void;
};

const Wallet = ({ onDisconnect }: WalletProps) => {
    const { publicKey, disconnect } = useWallet();
    const { connection } = useConnection();
    const [balance, setBalance] = useState<number>();
    const { getPrice, isLoading, getError } = useTokenPriceStore();

    const [price, setPrice] = useState<number | null>(null);

    const toDisconnect = async () => {
        await disconnect();
        onDisconnect()
    }

    const actions = [
        {
            title: "Manage wallet",
            icon: "settings-alt",
            url: "/settings#wallet",
        },
        {
            title: "Disconnect",
            icon: "close-square",
            onClick: toDisconnect,
        },
    ];

    useEffect(() => {
        const fetchBalance = async () => {
            if (publicKey) {
                try {
                    const lamports = await connection.getBalance(publicKey)
                    setBalance(lamports / 1e9)
                } catch (err) {
                    console.log(err)
                }
            } else {
                console.log('no publickey')
            }
        }
        fetchBalance();
    }, [connection, publicKey])

    useEffect(() => {
        getPrice('solana', 'usd').then(setPrice);
    }, []);
    // useEffect(() => {
    //     const tokenId = 'solana';
    //     const vsCurrency = 'usd';
    //     const fetchPrice = async () => {
    //         try {
    //             const response = await fetch(
    //                 `/api/token-price?id=${tokenId}&vs_currency=${vsCurrency}`
    //             );

    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch token price');
    //             }

    //             const result = await response.json();
    //             setPrice(result?.[tokenId]?.[vsCurrency])
    //         } catch (err) {
    //             console.log(err)
    //         } finally {
    //         }
    //     }
    //     fetchPrice();
    // }, [])

    const shorten = useShortenAddress();
    return (
        <div className={styles.wallet}>
            <div className={styles.head}>
                <div className={styles.title}>Connected wallet</div>
                <div className={styles.actions}>
                    {actions.map((action: any, index: number) =>
                        action.onClick ? (
                            <button
                                className={styles.action}
                                onClick={action.onClick}
                                key={index}
                            >
                                <Icon name={action.icon} />
                                {action.title}
                            </button>
                        ) : (
                            <Link className={styles.action} href={action.url} key={index}>
                                <Icon name={action.icon} />
                                {action.title}
                            </Link>
                        )
                    )}
                </div>
            </div>
            <div className={styles.details}>
                <div className={styles.code}>{publicKey ? shorten(publicKey?.toBase58()) : ''}</div>
                <div className={cn("h3", styles.line)}>
                    <div className={styles.crypto}>{formatBalance(balance ?? 0)} SOL</div>
                    <div className={styles.price}>{formatUSD((balance ?? 0) * (price ?? 0))}</div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
