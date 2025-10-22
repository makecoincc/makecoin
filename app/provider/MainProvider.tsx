'use client'
import { FC, ReactNode } from "react";

import {HeroUIProvider} from "@heroui/react";
import {ToastProvider} from "@heroui/toast";
import { ThemeProvider } from 'next-themes'
interface MainProviderProps {
  children: ReactNode;
}

export const MainProvider: FC<MainProviderProps> = ({ children }) => {
  return (
    <HeroUIProvider>
      <ToastProvider />
      <ThemeProvider attribute="class">
        {children}
      </ThemeProvider>
    </HeroUIProvider>
  );
}