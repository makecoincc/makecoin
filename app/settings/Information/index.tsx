'use client';
import { useEffect, useState } from "react";
import styles from "./Information.module.scss";
import Field from "@/components/Field";
import SocialLink from "@/components/SocialLink";
import { createClient } from '@/utils/supabase/client';
import useAuthStore from "@/store/useAuthStore";

type InformationProps = {};

type Web3State = {
  wallet: string;
  address: string;
};

const Information = ({ }: InformationProps) => {
    const supabase = createClient();
    const { user, isLoggedIn } = useAuthStore();

    const [email, setEmail] = useState<string>("hello@ui8.net");
    const [name, setName] = useState<string>("Dash");
    const [bio, setBio] = useState<string>("");
    // const [site, setSite] = useState<string>("https://ui8.net");
    const [x, setX] = useState<string>("");
    const [discord, setDiscord] = useState<string>("");
    const [web3, setWeb3] = useState<Web3State>({
        wallet: '',
        address: ''
    });
    const [isLinkingX, setIsLinkingX] = useState<boolean>(false);

    useEffect(() => {
        if (isLoggedIn) {
            user?.identities?.forEach(ele => {
                if (ele.provider === 'web3') {
                    const [_, wallet, address] = ele.id.split(':')
                    setWeb3({
                        wallet,
                        address
                    })
                } else if (ele.provider === 'discord') {
                    setDiscord(ele?.identity_data?.full_name)
                } else if (ele.provider === 'twitter') {
                    setX(ele?.identity_data?.full_name)
                }
            })
        }
    }, [isLoggedIn, user])

    const linkWeb3 = async () => {

    }

    const linkX = async () => {
        setIsLinkingX(true)
        try {
            const { data, error } = await supabase.auth.linkIdentity({ provider: 'twitter' })
            if (error) {
                console.log(error)
            } else {
                console.log(data)
            }
            setIsLinkingX(false)
        } catch (e) {
            console.log(e)
            setIsLinkingX(false)
        }

    }

    const linkDiscord = async () => {
        const { data, error } = await supabase.auth.linkIdentity({
            provider: 'discord', options: {
                redirectTo: `http://localhost:3000/auth/callback`,
            },
        })
        if (error) {
            console.log(error)
        } else {
            console.log(data)
        }

    }

    return (
        <div className={styles.information}>
            <div className={styles.fieldset}>
                <Field
                    className={styles.field}
                    label="Email"
                    icon="email"
                    type="email"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    required
                />
                <Field
                    className={styles.field}
                    label="Display name"
                    icon="profile"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    required
                />
                <Field
                    className={styles.field}
                    label="Short bio"
                    placeholder="About you"
                    icon="list-open"
                    value={bio}
                    onChange={(e: any) => setBio(e.target.value)}
                    textarea
                    required
                />
            </div>
            <div className={styles.label} id="identities">identities</div>
            <div className={styles.socials}>
                <SocialLink isWeb3 label={web3.wallet} value={web3.address} onVerify={() => linkWeb3()} onDisconnect={() => setWeb3({ wallet: '', address: ''})} />
                <SocialLink label="x" isLoading={isLinkingX} value={x} onVerify={() => linkX()} onDisconnect={() => setX("")} />
                <SocialLink label="discord" value={discord} onVerify={() => linkDiscord()} onDisconnect={() => setDiscord("")} />
                {/* <Field
                    className={styles.field}
                    label="Website"
                    icon="link"
                    value={site}
                    onChange={(e: any) => setSite(e.target.value)}
                    required
                />
                <Field
                    className={styles.field}
                    label="Twitter"
                    icon="twitter"
                    value={twitter}
                    onChange={(e: any) => setTwitter(e.target.value)}
                    required
                />
                <Field
                    className={styles.field}
                    label="Facebook"
                    icon="facebook"
                    value={facebook}
                    onChange={(e: any) => setFacebook(e.target.value)}
                    required
                /> */}
            </div>
        </div>
    );
};

export default Information;
