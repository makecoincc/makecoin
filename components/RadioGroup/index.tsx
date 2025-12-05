import cn from "classnames";
import { useState } from "react";
import styles from "./RadioGroup.module.scss";
import Icon from "@/components/Icon";

type RadioItemType = {
    label: string;
    value: string;
};

type RadioGroupProps = {
    className?: string;
    title: string;
    items: RadioItemType[];
    value?: string;
    dark?: boolean;
    onChange: (value: string) => void;
};

const RadioGroup = ({ className, items, onChange, dark, value, title }: RadioGroupProps) => {
    const [current, setCurrent] = useState<string | undefined>(value);
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
                        <span className={styles.check}>
                            <Icon name="check-fat" />
                        </span>
                        {status.label}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default RadioGroup;
