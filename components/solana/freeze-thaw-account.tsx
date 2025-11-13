'use client';
import React, { useState, useRef } from "react";

type FreezeThawAccountProps = React.HTMLAttributes<HTMLFormElement> & {
    onToolSelect?: (key: string) => void;
};

const FreezeThawAccount = React.forwardRef<HTMLFormElement, FreezeThawAccountProps>(
    ({ className, onToolSelect, ...props }, ref) => {
        return (
            <div>ddd</div>
        )
    })

export default FreezeThawAccount;

FreezeThawAccount.displayName = 'FreezeThawAccount';