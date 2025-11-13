'use client';
import React, { useState, useRef } from "react";

type TransferTokensProps = React.HTMLAttributes<HTMLFormElement> & {
    onToolSelect?: (key: string) => void;
};

const TransferTokens = React.forwardRef<HTMLFormElement, TransferTokensProps>(
    ({ className, onToolSelect, ...props }, ref) => {
        return (
            <div>ddd</div>
        )
    })

export default TransferTokens;

TransferTokens.displayName = 'TransferTokens';