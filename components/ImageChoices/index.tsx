import cn from "classnames";
import { useState } from "react";
import styles from "./ImageChoices.module.scss";
import Image from "@/components/Image";
import { cheeks, eyes, faces, glassesMap, hairs, hats, mouths, outfits } from "../DynamicAvatar";

type RadioItemType = {
    label: string;
    value: string;
};

type ImageChoicesProps = {
    className?: string;
    title: string;
    items: RadioItemType[];
    value?: string;
    dark?: boolean;
    onChange: (value: string) => void;
};

const ImageChoices = ({ className, items, onChange, dark, value, title }: ImageChoicesProps) => {
    const [current, setCurrent] = useState<string | undefined>(value);
        const parts: Record<string, any> = {
            cheeks,
            eyes,
            faces,
            glasses: glassesMap,
            hairs,
            hats,
            mouths,
            outfits,
        };
    const handleChange = (i: number) => {
        setCurrent(items[i].value);
        onChange && onChange(items[i].value)
    }
    return (
        <div className={cn(className, styles.radioGroup)}>
            <div className={styles.label}>{title}</div>
            <div className={styles.items}>
                {items.map((status, index: number) => (
                    <button
                        key={index}
                        className={cn(
                            styles.item,
                            { [styles.active]: status.value === current, [styles.dark]: dark },
                        )}
                        onClick={() => handleChange(index)}
                    >
                        {/* <span className={styles.check}>
                            <Icon name="check-fat" />
                        </span> */}
                        { status.value !== 'none' ? <Image src={ '/avatar/' + parts[title][status.value]}  width={85} height={85} alt={status.value}/> : "none"}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ImageChoices;
