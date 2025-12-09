'use client';
import Link from "next/link";
import cn from "classnames";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import styles from "./Wallet.module.scss";
import Icon from "@/components/Icon";
import { useShortenAddress } from "@/hooks";
import useTokenPriceStore from '@/store/useTokenPriceStore';
import useUmiStore from "@/store/useUmiStore";
import useAuthStore from "@/store/useAuthStore";
import { formatBalance, formatUSD } from "@/utils/formater";
import Image from "@/components/Image";
import { createClient } from '@/utils/supabase/client';
import { useWalletBalance } from '@/hooks/useWalletBalance';
import Spinner from "@/components/Spinner";

type WalletProps = {
    onDisconnect: () => void;
};

type WalletInfo = {
    name: string | undefined;
    icon: string | undefined;
}

const Wallet = ({ onDisconnect }: WalletProps) => {
    const { publicKey, disconnect, wallet, connected } = useWallet();
    const { getPrice, isLoading, getError } = useTokenPriceStore();
    const { balance, isLoading: isBalanceLoading, error  } = useWalletBalance(publicKey);
    const { isLoggedIn, logout} = useAuthStore();
    const { clearSinger } = useUmiStore();
    const [price, setPrice] = useState<number | null>(null);
    const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null)
    const supabase = createClient();

    const toDisconnect = async () => {
        try {
            await disconnect();
            // 如果用户已登录，也退出
            if (isLoggedIn) {
                const { error } = await supabase.auth.signOut();
                if (error) {
                    console.log(error)
                }
                logout();
            }
            // umi的singer清空
            await clearSinger();
            onDisconnect && onDisconnect()
        } catch(e) {
            console.log(e)
        }
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
        if (connected) {
            setWalletInfo({
                name: wallet?.adapter.name,
                icon: wallet?.adapter.icon
            })
        }
    }, [connected, wallet])

    useEffect(() => {
        getPrice('solana', 'usd').then(setPrice);
    }, []);

    const shorten = useShortenAddress();

    if (!connected) return <Spinner />

    return (
        <div className={styles.wallet}>
            <div className={styles.head}>
                <div className={styles.title}>Connected {walletInfo?.name}</div>
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
                <div className={`${styles.code} ${isLoggedIn ? styles.success : ''}`} >{ walletInfo?.icon && (<Image src={walletInfo.icon} width={32} height={32} alt="wallet" />)} {publicKey ? shorten(publicKey?.toBase58()) : ''}</div>
                <div className={cn("h3", styles.line)}>
                    { isBalanceLoading ? <Spinner /> : error ? <div>Error: {String(error)}</div> : <div className={styles.crypto}>{formatBalance(balance ?? 0)}SOL</div>}
                    { (isLoading('solana', 'usd') || isBalanceLoading) ? <Spinner /> : getError('solana', 'usd') ? <div>{getError('solana', 'usd')}</div> : <div className={styles.price}>{formatUSD((balance ?? 0) * (price ?? 0))}</div>}
                    
                </div>
            </div>
        </div>
    );
};

export default Wallet;
