'use client';
import React, { useState, useRef } from "react";

type MintTokensProps = React.HTMLAttributes<HTMLFormElement> & {
    onToolSelect?: (key: string) => void;
};

const MintTokens = React.forwardRef<HTMLFormElement, MintTokensProps>(
    ({ className, onToolSelect, ...props }, ref) => {
        return (
            <div>MintTokens</div>
        )
    })

export default MintTokens;

MintTokens.displayName = 'MintTokens';