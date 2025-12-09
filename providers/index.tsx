import React, { FC } from "react";
import { ThemeProviderWrapper } from './themeProvider';
import { WalletAdapterProvider } from './walletAdapterProvider';
import { UmiProvider } from './umiProvider';
import { SupbabaseProvider } from './supabaseProvider';
type Props = {
    children?: React.ReactNode;
};

export const Providers: FC<Props> = ({ children }) => {

    return (
        <ThemeProviderWrapper>
            <WalletAdapterProvider>
                <UmiProvider>
                    <SupbabaseProvider>
                        {children}

                    </SupbabaseProvider>
                </UmiProvider>
            </WalletAdapterProvider>
        </ThemeProviderWrapper>
    )
}