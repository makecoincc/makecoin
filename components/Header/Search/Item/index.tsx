// import cn from "classnames";
import Link from "next/link";
import styles from "./Item.module.scss";
import Image from "@/components/Image";

type ItemProps = {
    item: any;
};

const Item = ({ item }: ItemProps) => {
    return (
        <Link className={styles.item} href={item.url}>
            <div className={styles.preview}>
                {item.image && (
                    <Image
                        src={item.image}
                        fill
                        style={{ objectFit: 'cover' }}
                        alt="Result"
                    />
                )}
            </div>
            <div className={styles.details}>
                <div className={styles.title}>{item.title}</div>
                {item.buy && (
                    <div className={styles.content}>
                        <span>Buy now</span> {item.buy}
                    </div>
                )}
                {item.reserve && (
                    <div className={styles.content}>
                        <span>Buy now</span> {item.reserve}
                    </div>
                )}
                {item.login && (
                    <div className={styles.content}>
                        <span>@</span> {item.login}
                    </div>
                )}
            </div>
        </Link>
    );
};

export default Item;
