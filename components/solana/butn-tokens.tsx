'use client';
import React, { useState, useRef } from "react";

type BurnTokensProps = React.HTMLAttributes<HTMLFormElement> & {
    onToolSelect?: (key: string) => void;
};

const BurnTokens = React.forwardRef<HTMLFormElement, BurnTokensProps>(
    ({ className, onToolSelect, ...props }, ref) => {
        return (
            <div>ddd</div>
        )
    })

export default BurnTokens;