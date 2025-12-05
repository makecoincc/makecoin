import cn from "classnames";
import { useEffect, useState } from "react";
import styles from "./RadioGroup.module.scss";
import RadioGroup from "../RadioGroup";

type AvatarBuilderProps = {
    className?: string;
    dark?: boolean;
    onChange: (value: any) => void;
};

const cheeks = ['elips-pink', 'elips-red', 'rounded-pink', 'rounded-red', 'none'];
const eyes = ['close', 'flat', 'normal', 'pretty', 'sleepy'];
const faces = ['oval', 'rounded', 'square', 'v-face'];
const skins = ['dark', 'fair', 'light', 'medium'];
const glasses = ['3d', 'aviators', 'cat-eye', 'rectangle', 'retro', 'rounded', 'wide-cat-eye', 'none'];
const hairs = ['bun', 'crew-cut', 'curly', 'hijab', 'ponytail', 'straight', 'straight-long', 'tied', 'wavy', 'wavy-short'];
const hats = ['beanie', 'bucket', 'cowboy', 'floppy', 'straw', 'visor', 'none'];
const mouths = ['cute', 'eat', 'open', 'sad', 'smile-teeth', 'smile'];
const outfits = ['blue-blouse', 'blue-jumpsuit', 'blue-shirt', 'blue-t-shirt', 'green-hoodie', 'green-sport-t-shirt', 'green-strip-t-shirt', 'red-cardigan', 'red-t-shirt', 'white-office-shirt', 'yellow-sweater'];

const makeOptions = (arr: string[]) => {
    return arr.map(ele => {
        return {
            label: ele,
            value: ele
        }
    })
}

const avatars = {
    cheeks: makeOptions(cheeks),
    eyes: makeOptions(eyes),
    faces: makeOptions(faces.flatMap(face =>
        skins.map(skin => `${face}-${skin}`)
    )),
    glasses: makeOptions(glasses),
    hairs: makeOptions(hairs),
    hats: makeOptions(hats),
    mouths: makeOptions(mouths),
    outfits: makeOptions(outfits)
}

const AvatarBuilder = ({ className, onChange, dark }: AvatarBuilderProps) => {
    const [cheek, setCheek] = useState<string>("");
    const [eye, setEye] = useState<string>("normal");
    const [face, setFace] = useState<string>("v-face-fair");
    // const [skin, setSkin] = useState<string>("fair");
    const [glasses, setGlasses] = useState<string>("");
    const [hair, setHair] = useState<string>("wavy");
    const [hat, setHat] = useState<string>("");
    const [mouth, setMouth] = useState<string>("smile");
    const [outfit, setOutfit] = useState<string>("blue-t-shirt");
    const handleChange = (part: string, value: string) => {
        if (part === 'cheeks') {
            setCheek(value === 'none' ? '' : value);
        } else if (part === 'eyes') {
            setEye(value);
        } else if (part === 'faces') {
            setFace(value);
        } else if (part === 'glasses') {
            setGlasses(value === 'none' ? '' : value);
        } else if (part === 'hairs') {
            setHair(value);
        } else if (part === 'hats') {
            setHat(value === 'none' ? '' : value);
        } else if (part === 'mouths') {
            setMouth(value);
        } else if (part === 'outfits') {
            setOutfit(value);
        }
    }

    useEffect(() => {
        onChange({
            cheek,
            eye,
            face,
            glasses,
            hair,
            hat,
            mouth,
            outfit
        });
    }, [cheek,
        eye,
        face,
        glasses,
        hair,
        hat,
        mouth,
        outfit])
    const currentByPart: Record<string, string> = {
        cheeks: cheek,
        eyes: eye,
        faces: face,
        glasses: glasses,
        hairs: hair,
        hats: hat,
        mouths: mouth,
        outfits: outfit,
    };
    return (
        <div>
            {Object.entries(avatars).map(([part, options]) => {
                return (
                    <RadioGroup key={part} title={part} value={currentByPart[part]} items={options} onChange={(value) => handleChange(part, value)} />
                )
            })}
        </div>
    )
}

export default AvatarBuilder;
