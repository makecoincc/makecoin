import cn from "classnames";
import styles from "./DynamicAvatar.module.scss";
import Image from 'next/image'

type DynamicAvatarProps = {
    className?: string;
    bg?: number;
    cheek?: 'elips-pink' | 'elips-red' | 'rounded-pink' | 'rounded-red';
    eye?: 'close' | 'flat' | 'normal' | 'pretty' | 'sleepy';
    face?: 'oval-dark' | 'oval-fair' | 'oval-light' | 'oval-medium' | 'rounded-dark' | 'rounded-fair' | 'rounded-light' | 'rounded-medium' | 'square-dark' | 'square-fair' | 'square-light' | 'square-medium' | 'v-face-dark' | 'v-face-fair' | 'v-face-light' | 'v-face-medium';
    glasses?: '3d' | 'aviators' | 'cat-eye' | 'rectangle' | 'retro' | 'rounded' | 'wide-cat-eye';
    hair?: 'bun' | 'crew-cut' | 'curly' | 'hijab' | 'ponytail' | 'straight' | 'straight-long' | 'tied' | 'wavy' | 'wavy-short';
    hat?: 'beanie' | 'bucket' | 'cowboy' | 'floppy' | 'straw' | 'visor';
    mouth?: 'cute' | 'eat' | 'open' | 'sad' | 'smile-teeth' | 'smile' ;
    outfit?: 'blue-blouse' | 'blue-jumpsuit' | 'blue-shirt' | 'blue-t-shirt' | 'green-hoodie' | 'green-sport-t-shirt' | 'green-strip-t-shirt' | 'red-cardigan' | 'red-t-shirt' | 'white-office-shirt' | 'yellow-off-shoulder-top' | 'yellow-sweater'
};

const backgrounds = ['#fffac9', '#d6ccff', '#ffe8d8', '#cfffd7', '#ffc9b3', '#d0fff7'];

const cheeks = {
    "elips-pink": "Cheek=Elips, Color=Pink.svg",
    "elips-red": "Cheek=Elips, Color=Red.svg",
    "rounded-pink": "Cheek=Rounded, Color=Pink.svg",
    "rounded-red": "Cheek=Rounded, Color=Red.svg",
}
const eyes = {
    "close": "Eye=Close Eye.svg",
    "flat": "Eye=Flat Eye.svg",
    "normal": "Eye=Normal Eye.svg",
    "pretty": "Eye=Pretty Eye.svg",
    "sleepy": "Eye=Sleepy Eye.svg"
}

const faces = {
    "oval-dark": "Face=Oval, Skin=Dark.svg",
    "oval-fair": "Face=Oval, Skin=Fair.svg",
    "oval-light": "Face=Oval, Skin=Light.svg",
    "oval-medium": "Face=Oval, Skin=Medium.svg",
    "rounded-dark": "Face=Rounded, Skin=Dark.svg",
    "rounded-fair": "Face=Rounded, Skin=Fair.svg",
    "rounded-light": "Face=Rounded, Skin=Light.svg",
    "rounded-medium": "Face=Rounded, Skin=Medium.svg",
    "square-dark": "Face=Square, Skin=Dark.svg",
    "square-fair": "Face=Square, Skin=Fair.svg",
    "square-light": "Face=Square, Skin=Light.svg",
    "square-medium": "Face=Square, Skin=Medium.svg",
    "v-face-dark": "Face=V Face, Skin=Dark.svg",
    "v-face-fair": "Face=V Face, Skin=Fair.svg",
    "v-face-light": "Face=V Face, Skin=Light.svg",
    "v-face-medium": "Face=V Face, Skin=Medium.svg",
}
const glassesMap = {
    "3d": "Glasses=3D Glasses.svg",
    "aviators": "Glasses=Aviators Glasses.svg",
    "cat-eye": "Glasses=Cat Eye Glasses.svg",
    "rectangle": "Glasses=Rectangle Glasses.svg",
    "retro": "Glasses=Retro Glasses.svg",
    "rounded": "Glasses=Rounded Glasses.svg",
    "wide-cat-eye": "Glasses=Wide Cat Eye Glasses.svg",
}
const hairs = {
    "bun": "Hair=Bun Hair.svg",
    "crew-cut": "Hair=Crew Cut Hair.svg",
    "curly": "Hair=Curly Hair.svg",
    "hijab": "Hair=Hijab.svg",
    "ponytail": "Hair=Ponytail Hair.svg",
    "straight": "Hair=Straight Hair.svg",
    "straight-long": "Hair=Straight Long Hair.svg",
    "tied": "Hair=Tied Hair.svg",
    "wavy": "Hair=Wavy Hair.svg",
    "wavy-short": "Hair=Wavy Short Hair.svg",
}
const hats = {
    "beanie": "Hat=Beanie Hat.svg",
    "bucket": "Hat=Bucket Hat.svg",
    "cowboy": "Hat=Cowboy Hat.svg",
    "floppy": "Hat=Floppy Hat.svg",
    "straw": "Hat=Straw Hat.svg",
    "visor": "Hat=Visor Hat.svg",
}
const mouths = {
    "cute": "Mouth=Cute.svg",
    "eat": "Mouth=Eat.svg",
    "open": "Mouth=Open.svg",
    "sad": "Mouth=Sad.svg",
    "smile-teeth": "Mouth=Smile Teeth.svg",
    "smile": "Mouth=Smile.svg",
}
const outfits = {
    "blue-blouse": "Outfit=Blue Blouse.svg",
    "blue-jumpsuit": "Outfit=Blue Jumpsuit.svg",
    "blue-shirt": "Outfit=Blue Shirt.svg",
    "blue-t-shirt": "Outfit=Blue T-Shirt.svg",
    "green-hoodie": "Outfit=Green Hoodie.svg",
    "green-sport-t-shirt": "Outfit=Green Sport T-Shirt.svg",
    "green-strip-t-shirt": "Outfit=Green Strip T-Shirt.svg",
    "red-cardigan": "Outfit=Red Cardigan.svg",
    "red-t-shirt": "Outfit=Red T-Shirt.svg",
    "white-office-shirt": "Outfit=White Office Shirt.svg",
    "yellow-off-shoulder-top": "Outfit=Yellow Off Shoulder Top.svg",
    "yellow-sweater": "Outfit=Yellow Sweater.svg",
}

const DynamicAvatar = ({ className, bg = 0, cheek, eye = 'normal', face = 'v-face-fair', glasses, hair = 'wavy', hat, mouth = 'smile', outfit = 'blue-t-shirt' }: DynamicAvatarProps) => {
    return (
        <div className={cn(styles.avatar, className)} style={{background: backgrounds[bg]}}>
            {hat && (
                <Image
                    className={styles.hat}
                    src={`/avatar/${hats[hat]}`}
                    width={212.5}
                    height={192.5}
                    alt="hat"
                />
            )}
             <Image
                className={styles.hair}
                src={`/avatar/${hairs[hair]}`}
                width={212.5}
                height={212.5}
                alt="hair"
            />
            { cheek && (
                <Image
                    className={styles.cheek}
                    src={`/avatar/${cheeks[cheek]}`}
                    width={212.5}
                    height={212.5}
                    alt="cheek"
                />
            )}
             <Image
                className={styles.eye}
                src={`/avatar/${eyes[eye]}`}
                width={212.5}
                height={137.5}
                alt="eye"
            />
            {glasses && (
                <Image
                    className={styles.glasses}
                    src={`/avatar/${glassesMap[glasses]}`}
                    width={212.5}
                    height={172.5}
                    alt="glasses"
                />
            )}
             <Image
                className={styles.mouth}
                src={`/avatar/${mouths[mouth]}`}
                width={212.5}
                height={212.5}
                alt="mouth"
            />
            <Image
                className={styles.face}
                src={`/avatar/${faces[face]}`}
                width={212.5}
                height={212.5}
                alt="face"
            />
            <Image
                className={styles.outfit}
                src={`/avatar/${outfits[outfit]}`}
                width={212.5}
                height={112.5}
                alt="outfit"
            />
            
        </div>
    )
}

export default DynamicAvatar;