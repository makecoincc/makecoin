'use client';
import { useState } from "react";
// import OutsideClickHandler from "react-outside-click-handler";
// import { useHotkeys } from "react-hotkeys-hook";
import Link from "next/link";
import cn from "classnames";
import styles from "./Discover.module.scss";
import Icon from "@/components/Icon";

export const discover = [
    {
        title: "Browse",
        url: "/discover",
    },
    {
        title: "Ranking",
        url: "/discover/ranking",
    },
];

type DiscoverProps = {
    className?: string;
    light?: boolean;
};

const Discover = ({ className, light }: DiscoverProps) => {
    const [visible, setVisible] = useState<boolean>(false);
    // useHotkeys("esc", () => setVisible(false));

    return (
        // <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
            <div
                className={cn(
                    styles.discover,
                    { [styles.active]: visible },
                    { [styles.light]: light },
                    className
                )}
            >
                <button
                    className={styles.head}
                    onClick={() => setVisible(!visible)}
                >
                    DISCOVER <Icon name="arrow-down" />
                </button>
                <div className={styles.body}>
                    <div className={styles.list}>
                        {discover.map((item, index) => (
                            <Link className={styles.item} href={item.url} key={index}>
                                {item.title}
                                <Icon name="arrow-right-thin" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        // </OutsideClickHandler>
    );
};

export default Discover;
