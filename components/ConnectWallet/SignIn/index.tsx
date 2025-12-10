'use client';
import { useState } from "react";
import cn from "classnames";
import styles from "./SignIn.module.scss";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Spinner from "@/components/Spinner";
import useAuthStore from "@/store/useAuthStore";
import { createClient } from '@/utils/supabase/client';

type SignInProps = {
    onFinish?: () => void;
};

const SignIn = ({ onFinish }: SignInProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const supabase = createClient();
    const { setAuth } = useAuthStore();
    const handleSignIn = async () => {
        if (isLoading) return;
        try {
            setIsLoading(true)
            const { data, error } = await supabase.auth.signInWithWeb3({
                chain: 'solana',
                statement: 'I accept the Terms of Service at https://docs.makecoin.cc/terms',
            })
            if (error) {
                console.log(error)
                setIsLoading(false)
            } else {
                console.log(data)
                setAuth(data.session, 'solana')
                setIsLoading(false)
                onFinish && onFinish();
            }
        } catch (e) {
            console.log(e)
            setIsLoading(false)
        }
    }
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
                Sign in makecoin <br></br> with your wallet
            </div>
            <div className={styles.info}>
                You can either sign in to showcase and trade your nfts or tokens, or skip sign-in to use the platform purely as a blockchain utility tool.
            </div>
            <div className={styles.btns}>
                <button className={cn("button-stroke-white", styles.button)} onClick={onFinish}>
                    Skip
                </button>
                <button
                    className={cn("button-white items-center gap-2", styles.button)}
                    onClick={handleSignIn}
                >
                    {isLoading && (<Spinner className={styles.spinner} dark />)}
                    Sign in with Solana
                </button>
            </div>
            <div className={styles.links}>
                <button className={styles.question}>New to Solana?</button>
                <button className={styles.learn}>
                    Learn about wallet <Icon name="arrow-right" />
                </button>
            </div>
        </div>
    )
};

export default SignIn;
