'use client';
import { useEffect, useRef } from "react";
// import { disablePageScroll, enablePageScroll } from "scroll-lock";
// import OutsideClickHandler from "react-outside-click-handler";
import cn from "classnames";
import styles from "./Profile.module.scss";
import Image from "@/components/Image";
import NavLink from "@/components/NavLink";
import Icon from "@/components/Icon";
import Wallet from "./Wallet";
import DynamicAvatar from "@/components/DynamicAvatar";
import useUmiStore from "@/store/useUmiStore";

const menu = [
    {
        title: "My profile",
        url: "/profile",
    },
    {
        title: "Settings",
        url: "/settings",
    },
    {
        title: "Help",
        url: "/help",
    },
];

type ProfileProps = {
    className?: string;
    headClassName?: string;
    bodyClassName?: string;
    visible: any;
    onOpen: () => void;
    onClose: () => void;
    onDisconnect: () => void;
};

const Profile = ({
    className,
    headClassName,
    bodyClassName,
    onOpen,
    onClose,
    onDisconnect,
    visible,
}: ProfileProps) => {
    const initialRender = useRef(true);
    const { signer } = useUmiStore();
    // useEffect(() => {
    //     if (initialRender.current) {
    //         initialRender.current = false;
    //     } else {
    //         visible ? disablePageScroll() : enablePageScroll();
    //     }
    // }, [visible]);

    return (
        // <OutsideClickHandler onOutsideClick={onClose}>
            <div
                className={cn(
                    styles.profile,
                    { [styles.active]: visible },
                    className
                )}
            >
                <button
                    className={cn(styles.head, headClassName)}
                    onClick={onOpen}
                >
                    {/* <Image
                        src="/images/avatar.jpg"
                        fill
                        style={{ objectFit: 'cover' }}
                        alt="Avatar"
                    /> */}
                    <DynamicAvatar />
                </button>
                <div className={cn(styles.body, bodyClassName)}>
                    <button
                        className={cn(
                            "button-circle button-medium",
                            styles.close
                        )}
                        onClick={onClose}
                    >
                        <Icon name="close-fat" />
                    </button>
                    <div className={styles.user}>
                        <div className={styles.avatar}>
                            {/* <Image
                                src="/images/avatar.jpg"
                                fill
                                style={{ objectFit: 'cover' }}
                                alt="Avatar"
                            /> */}
                            <DynamicAvatar />
                        </div>
                        <div className={styles.details}>
                            <div className={cn("h3", styles.man)}>User#{signer?.publicKey?.slice(-4)}</div>
                            <div className={styles.login}>@yourname</div>
                        </div>
                    </div>
                    <Wallet onDisconnect={onDisconnect} />
                    <div className={styles.menu}>
                        {menu.map((link, index) => (
                            <NavLink
                                className={cn(styles.link)}
                                activeClassName={styles.active}
                                href={link.url}
                                key={index}
                            >
                                {link.title}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        // </OutsideClickHandler>
    );
};

export default Profile;
