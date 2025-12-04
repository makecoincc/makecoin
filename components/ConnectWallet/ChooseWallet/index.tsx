'use client';
import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import cn from "classnames";
import styles from "./ChooseWallet.module.scss";
import Icon from "@/components/Icon";
import Image from "@/components/Image";

const tabs = ["Wallets"];

// const wallets = [
// {
//     title: "MetaMask",
//     image: "/images/meta-mask.svg",
// },
// {
//     title: "Phantom",
//     image: "/images/phantom.svg",
// },
// {
//     title: "Coinbase Wallet",
//     image: "/images/coin-base.svg",
// },
// {
//     title: "MyEtherWallet",
//     image: "/images/my-ether-wallet.svg",
// },
// ];

type ChooseWalletProps = {
    onScan?: () => void;
    onClickWallet?: (name: string) => void;
};

const ChooseWallet = ({ onScan, onClickWallet }: ChooseWalletProps) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const { wallets, wallet, select, connect, connecting } = useWallet();

    const onWalletSelect = (walletName: string) => {
        select(walletName as any); // 只改选中钱包，不连接
        onClickWallet && onClickWallet(walletName)
    };

    return (
        <div className={styles.choose}>
            <div className={cn("h3", styles.title)}>Choose the wallet</div>
            <div className={styles.head}>
                <div className={styles.tabs}>
                    {tabs.map((item, index) => (
                        <button
                            className={cn(styles.tab, {
                                [styles.active]: activeIndex === index,
                            })}
                            onClick={() => setActiveIndex(index)}
                            key={index}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.wallets}>
                {wallets.map((wallet, index) => (
                    <button
                        className={styles.wallet}
                        key={index}
                        onClick={() => onWalletSelect(wallet.adapter.name)}
                    >
                        <span className={styles.inner}>
                            <span className={styles.icon}>
                                <Image
                                    src={wallet.adapter.icon}
                                    width={40}
                                    height={40}
                                    alt="Wallet"
                                />
                            </span>
                            {wallet.adapter.name} <Icon name="arrow-right" />
                        </span>
                    </button>
                ))}
            </div>
            {/* <div className={styles.btns}>
                <button className={styles.scan} onClick={onScan}>
                    Scan to connect
                </button>
            </div> */}
        </div>
    );
};

export default ChooseWallet;
