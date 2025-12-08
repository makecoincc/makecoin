'use client';
import { useEffect, useRef } from "react";
import cn from "classnames";
import { useWallet } from "@solana/wallet-adapter-react";
import styles from "./Message.module.scss";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Spinner from "@/components/Spinner";

type MessageProps = {
    onContinue?: () => void;
    onBack?: () => void;
};

const Message = ({ onContinue, onBack }: MessageProps) => {
    const { connect, connected, connecting, disconnect } = useWallet();
    const hasAttemptedConnect = useRef(false);

    const onDisconnect = async () => {
        await disconnect();
        onBack && onBack();
    }

    useEffect(() => {
        if (!connected && !hasAttemptedConnect.current) {
            connect();
            hasAttemptedConnect.current = true;
        }
    }, [connected, connect]);
    return (
        <div className={styles.message}>
            <div className={styles.logo}>
                <Image
                    src="/images/logo-connect-wallet.svg"
                    width={80}
                    height={80}
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                    alt="Logo"
                />
            </div>
            <div className={cn("h3", styles.title)}>
                { connected ? (
                    <>Wallet <br></br>connected</>
                ) : (
                    <>Sign the message <br></br>in your wallet to continue</>
                )}
                
            </div>
            <div className={styles.info}>
                Crypter uses this signature to verify that you’re the owner of this
                Solana address.
            </div>
            { connecting && (
                <div className={cn(styles.btns, "gap-4 text-white")}>
                    <Spinner className={styles.spinner} />
                    Connecting...
                </div>
            )}
            { connected && (
                <div className={styles.btns}>
                    <button className={cn("button-stroke-white", styles.button)} onClick={onDisconnect}>
                        Disconnect
                    </button>
                    <button
                        className={cn("button-white", styles.button)}
                        onClick={onContinue}
                    >
                        Continue
                    </button>
                </div>
            )}
            <div className={styles.links}>
                <button className={styles.question}>New to Solana?</button>
                <button className={styles.learn}>
                    Learn about wallet <Icon name="arrow-right" />
                </button>
            </div>
        </div>
    )
}

export default Message;
