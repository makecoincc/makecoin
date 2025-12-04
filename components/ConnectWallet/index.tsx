'use client';
import { useState } from "react";
import cn from "classnames";
import styles from "./ConnectWallet.module.scss";
import Logo from "@/components/Logo";
import Arrow from "@/components/Arrow";
import Icon from "@/components/Icon";
import ChooseWallet from "./ChooseWallet";
import ScanToConnect from "./ScanToConnect";
import Message from "./Message";

type ConnectWalletProps = {
    onClickLogo?: () => void;
    onContinue?: (wallet: string) => void;
};

const ConnectWallet = ({ onClickLogo, onContinue }: ConnectWalletProps) => {
    const [cookies, setCookies] = useState<boolean>(false);
    const [scan, setScan] = useState<boolean>(false);
    const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
    const [walletName, setWalletName] = useState<string>("");

    const onWalletSelect = (wallet: string) => {
        setWalletName(wallet);
        setIsMessageVisible(true);
    }

    return (
        <div className={styles.row}>
            <div
                className={styles.col}
                style={{
                    backgroundColor:
                        (scan && "#B9A9FB") ||
                        (isMessageVisible && "#DBFF73") ||
                        "#BCE6EC",
                }}
            >
                <Logo className={styles.logo} onClick={onClickLogo} />
                <div className={styles.line}>
                    <h1 className={cn("h1", styles.title)}>Connect wallet.</h1>
                    <Arrow className={styles.arrow} color="#F7FBFA" />
                </div>
                <div className={styles.info}>
                    {isMessageVisible
                        ? "Sign the message in your wallet to continue"
                        : "Choose how you want to connect. There are several wallet providers."}
                </div>
            </div>
            <div className={styles.col}>
                {isMessageVisible ? (
                    <>
                        <button
                            className={cn("button-circle", styles.back)}
                            onClick={() => setIsMessageVisible(false)}
                        >
                            <Icon name="arrow-left" />
                        </button>
                        <Message onContinue={() => onContinue && onContinue(walletName)} />
                    </>
                ) : scan ? (
                    <>
                        <button
                            className={cn("button-circle", styles.back)}
                            onClick={() => setScan(false)}
                        >
                            <Icon name="arrow-left" />
                        </button>
                        <ScanToConnect />
                    </>
                ) : (
                    <ChooseWallet
                        onScan={() => setScan(true)}
                        onClickWallet={(wallet) => onWalletSelect(wallet)}
                    />
                )}
                {!isMessageVisible && (
                    <div
                        className={cn(styles.cookies, {
                            [styles.hide]: cookies,
                        })}
                    >
                        <div className={styles.text}>
                            We use 🍪 <span>cookies</span> for better experience
                        </div>
                        <button
                            className={styles.accept}
                            onClick={() => setCookies(true)}
                        >
                            Accept
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConnectWallet;
