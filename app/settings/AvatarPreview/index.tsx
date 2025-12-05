import cn from "classnames";
import styles from "./AvatarPreview.module.scss";
import DynamicAvatar from "@/components/DynamicAvatar";

type AvatarPreviewProps = {
    avatar: any
};

const AvatarPreview = ({ avatar }: AvatarPreviewProps) => {
    return (
        <div className={styles.upload}>
            <div className={styles.preview}>
                <DynamicAvatar cheek={avatar.cheek} mouth={avatar.mouth} eye={avatar.eye} face={avatar.face} glasses={avatar.glasses} hair={avatar.hair} hat={avatar.hat} outfit={avatar.outfit}/>
            </div>
            <div className={styles.details}>
                <div className={cn("h4", styles.title)}>Dynamic Avatar</div>
                <div className={styles.content}>
                    We recommended an image of at least 800x800. Gifs work too.
                </div>
                <div className={styles.file}>
                    <button
                        className={cn(
                            "button-stroke-grey button-medium",
                            styles.button
                        )}
                    >
                        custom
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AvatarPreview;
