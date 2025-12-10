import styles from './SocialLink.module.scss';
import cn from 'classnames';
import Image from '@/components/Image';
import { useShortenAddress } from "@/hooks";
import Spinner from '../Spinner';

type SocialLinkProp = {
    label: string;
    value: string;
    isWeb3?: boolean;
    isLoading?: boolean;
    onVerify?: () => void;
    onDisconnect?: () => void;
}

const SocialLink = ({ label, value, isWeb3, isLoading, onVerify, onDisconnect }: SocialLinkProp & { onVerify?: () => void }) => {
    const shorten = useShortenAddress();

    const onVerifyClick = () => {
        if (onVerify) {
            onVerify();
        } else {
            console.log('not support')
        }
    }
    return (
        <div className={styles.socialLink}>
            <div className={styles.main}>
                <div className={styles.icon}>
                    { label ? <Image src={`/images/${label.toLowerCase()}.svg`} width={40} height={40} alt={label} /> : '' }
                </div>
                <div className={styles.content}>
                    <p className={styles.title}>{label}</p>
                    <span className={styles.value}>{ !value ? '_' : isWeb3 ? shorten(value) : `@${value}`}</span>
                </div>
            </div>
            <div>
                { !value ? (
                    <button className={styles.button} onClick={onVerifyClick}>{isLoading && (<Spinner />)}Verify</button>
                ) : null}
                { value ? (
                    <button className={cn(styles.disconnect)} onClick={onDisconnect}>Disconnect</button>
                ) : null}
            </div>
        </div>
    )
}

export default SocialLink;
