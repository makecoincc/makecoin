'use client'
import { FC, ReactNode } from "react";

import {HeroUIProvider} from "@heroui/react";
import {ToastProvider} from "@heroui/toast";

interface HeroProviderProps {
  children: ReactNode;
}

export const HeroProvider: FC<HeroProviderProps> = ({ children }) => {
  return (
    <HeroUIProvider>
      <ToastProvider />
      {children}
    </HeroUIProvider>
  );
}