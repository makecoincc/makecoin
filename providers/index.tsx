import React, { FC, useMemo } from "react";
import { ThemeProviderWrapper } from './themeProvider';
import { WalletAdapterProvider } from './walletAdapterProvider';
import { UmiProvider } from './umiProvider';

type Props = {
    children?: React.ReactNode;
};

export const Providers: FC<Props> = ({ children }) => {

    return (
        <ThemeProviderWrapper>
            <WalletAdapterProvider>
                <UmiProvider>
                    {children}
                </UmiProvider>
            </WalletAdapterProvider>
        </ThemeProviderWrapper>
    )
}