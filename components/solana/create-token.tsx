"use client";

import type { InputProps } from "@heroui/react";
import React from "react";
import {
  Spacer,
  Tabs,
  Tab,
} from "@heroui/react";
import { AnimatePresence } from "framer-motion";
import { cn } from "@heroui/react";
import OriginalForm from './create-original';
import Token2022Form from './create-token2022';

export type CreateFormProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: InputProps["variant"];
  hideTitle?: boolean;
  onDone?: () => void;
};

type CreateTokenProps = {
  className?: string;
  onToolSelect?: (key: string) => void;
};

const CreateToken = ({ className, onToolSelect }: CreateTokenProps) => {
  const [activeKey, setActiveKey] = React.useState<string>("original");
  return (
    <div className={cn("flex flex-col gap-4 py-8", className)}>
      <Tabs selectedKey={activeKey} onSelectionChange={(key) => setActiveKey(key as string)}>
        <Tab key="original" title="Original" />
        <Tab key="token-2022" title="Token 2022" />
      </Tabs>
      <Spacer y={2} />
      <AnimatePresence>
        {activeKey === "original" && <OriginalForm onDone={() => onToolSelect && onToolSelect('solana-tools')} />}
        {activeKey === "token-2022" && <Token2022Form onDone={() => onToolSelect && onToolSelect('solana-tools')} />}
      </AnimatePresence>
    </div>
  );
}

export default CreateToken;
