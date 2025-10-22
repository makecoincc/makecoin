"use client";

import type { CardProps } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Card, CardBody, Image, CardHeader, CardFooter, Button } from "@heroui/react";
import { m, useMotionValue, domAnimation, LazyMotion, useMotionTemplate } from "framer-motion";

type ChainType = {
  name: string;
  desc: string;
}

interface CustomCardProps extends CardProps {
  chain: ChainType;
}
export default function ChainCard(props: CustomCardProps) {
  const router = useRouter();
  const { chain } = props;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cardRef = React.useRef<HTMLDivElement>(null);

  function onMouseMove({ clientX, clientY }: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!cardRef?.current) return;

    const { left, top } = cardRef.current?.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const onPress = () => {
    router.push(`/${chain.name.toLowerCase()}`);
  }

  return (
    <Card
      ref={cardRef}
      className="group overflow-none p-px relative bg-linear-to-br from-white/60 via-gray-100/40 to-white/60 dark:from-gray-900/50 dark:via-gray-800/25 dark:to-gray-900/50"
      {...props}
      onMouseMove={onMouseMove}
    >
      <LazyMotion features={domAnimation}>
        <m.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-250 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 50, 215, 0.2),
              transparent 80%
            )
          `, // <- Add your own color here
          }}
        />
      </LazyMotion>
      <CardHeader>
        <div className="flex items-center gap-3">
          {chain && <Image src={`https://img.makecoin.cc/${chain.name.toLowerCase()}.png`} alt={chain.name} width={40} height={40} style={{ width: 'auto', height: 'auto' }} />}
          <p className="text-large font-medium dark:text-white">{chain.name}</p>
        </div>
      </CardHeader>
      <CardBody className="px-3">
        <div className="flex flex-col gap-2 px-2">
          <p className="text-large font-medium dark:text-white/80">{chain.name} Tools</p>
          <p className="text-small dark:text-white/60">
            {chain.desc}
          </p>
        </div>
      </CardBody>
      <CardFooter className="justify-end gap-2">
        <Button fullWidth className="z-99 border-small dark:border-white/20 bg-white/10 dark:text-white" onPress={onPress}>
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
}
