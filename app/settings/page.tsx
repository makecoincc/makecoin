'use client';
import { useRef, useState } from "react";
import cn from "classnames";
import styles from "./SettingsPage.module.scss";
import Layout from "@/components/Layout";
import Icon from "@/components/Icon";
import Upload from "./Upload";
import Information from "./Information";
// import Wallet from "./Wallet";
import Notification from "./Notification";
import AvatarBuilder from "@/components/AvatarBuilder";
import AvatarPreview from "./AvatarPreview";
import Tabs from "@/components/Tabs"
const SettingsPage = () => {
    const scrollToRefProfile = useRef<any>(null);
    const scrollToRefAvatarBuilder = useRef<any>(null);
    const scrollToRefNotification = useRef<any>(null);
    const [active, setActive] = useState<any>(scrollToRefProfile);
    const [avatar, setAvatar] = useState<any>({});
    const [avatarType, setAavtarType] = useState<string>('dynamic')
    const tabs = [
        {
            title: 'Dynamic avatar',
            value: 'dynamic'
        },
        {
            title: 'Upload avatar',
            value: 'upload'
        }
    ]
    const menu = [
        {
            title: "Profile",
            anchor: scrollToRefProfile,
        },
        // {
        //     title: "Wallet",
        //     anchor: scrollToRefWallet,
        // },
        {
            title: "Notification",
            anchor: scrollToRefNotification,
        },
    ];

    const handleClick = (anchor: any) => {
        anchor.current.scrollIntoView({
            behavior: "smooth",
        });
        setActive(anchor);
    };

    const onChange = (e: any) => {
        console.log(e);
        setAvatar(e);
    }

    return (
        <Layout layoutNoOverflow footerHide noRegistration>
            <div className={styles.row}>
                <div className={styles.col}>
                    <div className={styles.wrap}>
                        <div className={styles.head}>
                            <div className={cn("h1", styles.title)}>
                                Settings
                            </div>
                            <button
                                className={cn("button-large", styles.button)}
                            >
                                <span>Save</span>
                                <Icon name="check" />
                            </button>
                        </div>
                        <div className={styles.menu}>
                            {menu.map((link, index) => (
                                <button
                                    className={cn("h4", styles.link, {
                                        [styles.active]: link.anchor === active,
                                    })}
                                    key={index}
                                    onClick={() => handleClick(link.anchor)}
                                >
                                    {link.title}
                                    <Icon name="arrow-right" />
                                </button>
                            ))}
                        </div>
                        <Tabs
                            className={styles.tabs}
                            items={tabs}
                            value={avatarType}
                            setValue={setAavtarType}
                        />
                        { avatarType === 'upload' ? (
                            <Upload />
                        ) : (
                            <AvatarPreview avatar={avatar} onCustomAvatar={() => handleClick(scrollToRefAvatarBuilder)}/>
                        )}
                    </div>
                </div>
                <div className={styles.col}>
                    <div className={styles.section}>
                        <div
                            className={styles.anchor}
                            ref={scrollToRefProfile}
                        ></div>
                        <div className={styles.label}>information</div>
                        <Information />
                    </div>
                    {/* <div className={styles.section} id="wallet">
                        <div
                            className={styles.anchor}
                            ref={scrollToRefWallet}
                        ></div>
                        <div className={styles.label}>wallet</div>
                        <Wallet />
                    </div> */}
                    <div className={styles.section}>
                        <div
                            className={styles.anchor}
                            ref={scrollToRefNotification}
                        ></div>
                        <div className={styles.label}>notification</div>
                        <Notification />
                    </div>
                    { avatarType === 'dynamic' && (
                        <div className={styles.section}>
                            <div
                                className={styles.anchor}
                                ref={scrollToRefAvatarBuilder}
                            ></div>
                            <div className={styles.label}>Dynamic Avatar</div>
                            <AvatarBuilder onChange={onChange}/>
                        </div>
                    )}
                    
                </div>
            </div>
        </Layout>
    );
};

export default SettingsPage;
