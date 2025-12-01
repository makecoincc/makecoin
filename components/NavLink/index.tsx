'use client';
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import cn from "classnames";
import styles from "./NavLink.module.scss";
import Icon from "@/components/Icon";

type NavLinkProps = {
    className?: string;
    activeClassName?: any;
    href: string;
    children: React.ReactNode;
};

const NavLink = ({
    className,
    activeClassName,
    href,
    children,
}: NavLinkProps) => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <Link href={href} className={cn("h3", styles.link, className, {
                    [styles.active]: pathname === href,
                })}>
            
                <div className={styles.title}>
                    {children}
                    <span className={styles.hover}>{children}</span>
                </div>
                <Icon name="arrow-right" />
        </Link>
    );
};

export default NavLink;
