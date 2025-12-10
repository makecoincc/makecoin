import cn from "classnames";
import styles from "./AvatarPreview.module.scss";
import DynamicAvatar from "@/components/DynamicAvatar";

type AvatarPreviewProps = {
    avatar: any;
    onCustomAvatar?: () => void;
};

const AvatarPreview = ({ avatar, onCustomAvatar }: AvatarPreviewProps) => {
    return (
        <div className={styles.upload}>
            <div className={styles.preview}>
                <DynamicAvatar cheek={avatar.cheek} mouth={avatar.mouth} eye={avatar.eye} face={avatar.face} glasses={avatar.glasses} hair={avatar.hair} hat={avatar.hat} outfit={avatar.outfit}/>
            </div>
            <div className={styles.details}>
                <div className={cn("h4", styles.title)}>Dynamic Avatar</div>
                <div className={styles.content}>
                    Customize your avatar by choosing eyes, face shape, and more
                </div>
                <div className={styles.file}>
                    <button
                        className={cn(
                            "button-stroke-grey button-medium",
                            styles.button
                        )}
                        onClick={onCustomAvatar}
                    >
                        custom
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AvatarPreview;
