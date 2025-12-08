'use client';
import { useState } from "react";
import cn from "classnames";
import styles from "./ConnectWallet.module.scss";
import Logo from "@/components/Logo";
import Arrow from "@/components/Arrow";
import Icon from "@/components/Icon";
import ChooseWallet from "./ChooseWallet";
import SignIn from "./SignIn";
import Message from "./Message";

type ConnectWalletProps = {
    onClickLogo?: () => void;
    onFinish?: () => void;
};

const ConnectWallet = ({ onClickLogo, onFinish }: ConnectWalletProps) => {
    const [cookies, setCookies] = useState<boolean>(false);
    const [isSignInVisible, setIsSignInVisible] = useState<boolean>(false);
    const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);

    // ChooseWallet 完成钱包选择
    const onWalletChosen = () => {
        setIsMessageVisible(true);
    }

    // Message 完成钱包连接
    const onMessageSign = () => {
        setIsMessageVisible(false);
        setIsSignInVisible(true);
    }

    // SignIn 完成 supabase signin
    

    return (
        <div className={styles.row}>
            <div
                className={styles.col}
                style={{
                    backgroundColor:
                        (isSignInVisible && "#B9A9FB") ||
                        (isMessageVisible && "#DBFF73") ||
                        "#BCE6EC",
                }}
            >
                <Logo className={styles.logo} onClick={onClickLogo} />
                <div className={styles.line}>
                    <h1 className={cn("h1", styles.title)}>
                        {isMessageVisible ? 'Connect wallet.' : isSignInVisible ? 'Sign in with wallet.' : ''}
                        </h1>
                    <Arrow className={styles.arrow} color="#F7FBFA" />
                </div>
                <div className={styles.info}>
                    {isMessageVisible
                        ? "Sign the message in your wallet to continue"
                        : isSignInVisible ? 'Recommend signing in to showcase your digital assets and trade with others.' 
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
                        <Message onContinue={onMessageSign} onBack={() => setIsMessageVisible(false)} />
                    </>
                ) : isSignInVisible ? (
                    <>
                        <button
                            className={cn("button-circle", styles.back)}
                            onClick={() => {setIsSignInVisible(false); setIsMessageVisible(true)}}
                        >
                            <Icon name="arrow-left" />
                        </button>
                        <SignIn onFinish={onFinish}/>
                    </>
                ) : (
                    <ChooseWallet
                        onScan={() => setIsSignInVisible(true)}
                        onClickWallet={onWalletChosen}
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
