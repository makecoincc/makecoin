'use client'
import { FC, ReactNode } from "react";

// 1. import `HeroUIProvider` component
import {HeroUIProvider} from "@heroui/react";

interface HeroProviderProps {
  children: ReactNode;
}

export const HeroProvider: FC<HeroProviderProps> = ({ children }) => {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  );
}