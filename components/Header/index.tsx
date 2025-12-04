'use client';
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
// import { useHotkeys } from "react-hotkeys-hook";
import Link from "next/link";
import cn from "classnames";
import styles from "./Header.module.scss";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import ConnectWallet from "@/components/ConnectWallet";
import Search from "./Search";
import Discover from "./Discover";
import Profile from "./Profile";
import Menu from "./Menu";

const resultSearch = [
    {
        title: "NFTs",
        items: [],
    },
    {
        title: "collection",
        items: [],
    },
    {
        title: "artist",
        items: [],
    },
];
const menu = [
    {
        title: "Discover",
        url: "/discover",
    },
    {
        title: "Feed",
        url: "/feed",
    },
];

type HeaderProps = {
    className?: string;
    noRegistration?: boolean;
    light?: boolean;
    empty?: boolean;
};

const Header = ({ className, noRegistration, light, empty }: HeaderProps) => {
    const [visibleProfile, setVisibleProfile] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [registration, setRegistration] = useState<boolean>(false);
    // useHotkeys("esc", () => setVisibleProfile(false));
    const { connected, connect } = useWallet();

    const handleWalletSelect = async (wallet: string) => {
        await connect()
        setIsModalOpen(false);
        setRegistration(true);
    };

    useEffect(() => {
        setRegistration(connected)
    }, [connected])

    return (
        <>
            <header
                className={cn(
                    styles.header,
                    {
                        [styles.profileOpen]: visibleProfile,
                        [styles.light]: visibleProfile || light,
                        [styles.empty]: empty,
                        [styles.noRegistration]:
                            noRegistration && !registration,
                    },
                    className
                )}
            >
                {empty ? (
                    <>
                        <Logo
                            className={styles.logo}
                            light={visibleProfile || light}
                        />
                        <Profile
                            className={styles.profile}
                            headClassName={styles.profileHead}
                            bodyClassName={styles.profileBody}
                            onOpen={() => setVisibleProfile(!visibleProfile)}
                            onClose={() => setVisibleProfile(false)}
                            visible={visibleProfile}
                        />
                    </>
                ) : (
                    <>
                        <div className={styles.col}>
                            <Logo
                                className={styles.logo}
                                light={visibleProfile || light}
                            />
                            <Search
                                className={styles.search}
                                result={resultSearch}
                                light={visibleProfile || light}
                            />
                        </div>
                        <div className={styles.col}>
                            <Discover
                                className={styles.discover}
                                light={visibleProfile || light}
                            />
                            <div className={styles.navigation}>
                                {menu.map((link, index) => (
                                    <Link className={styles.link} href={link.url} key={index}>
                                        {link.title}
                                    </Link>
                                ))}
                            </div>
                            <Link className={cn(
                                "button-stroke button-medium",
                                styles.button,
                                styles.create
                            )} href="/create">
                                <span>create</span>
                                <Icon name="plus" />
                            </Link>

                            
                            <button
                                className={cn(
                                    "button-stroke button-medium",
                                    styles.button,
                                    styles.connect
                                )}
                                onClick={() => setIsModalOpen(true)}
                            >
                                connect wallet
                            </button>
                            <Link className={cn(
                                styles.notification,
                                styles.active
                            )} href="/notification">
                                <Icon name="flash" />
                            </Link>
                            <Profile
                                className={styles.profile}
                                onOpen={() =>
                                    setVisibleProfile(!visibleProfile)
                                }
                                onClose={() => setVisibleProfile(false)}
                                visible={visibleProfile}
                            />
                            <Menu
                                classBurger={styles.burger}
                                resultSearch={resultSearch}
                            />
                        </div>
                    </>
                )}
            </header>
            <div
                className={cn(styles.overlay, {
                    [styles.visible]: visibleProfile,
                })}
            ></div>
            <Modal
                className={styles.modal}
                closeClassName={styles.close}
                visible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <ConnectWallet
                    onClickLogo={() => setIsModalOpen(false)}
                    onContinue={handleWalletSelect}
                />
            </Modal>
        </>
    );
};

export default Header;
