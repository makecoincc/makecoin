'use client';
import React, { useState, useRef } from "react";

type CloseTokenAccountProps = React.HTMLAttributes<HTMLFormElement> & {
    onToolSelect?: (key: string) => void;
};

const CloseTokenAccount = React.forwardRef<HTMLFormElement, CloseTokenAccountProps>(
    ({ className, onToolSelect, ...props }, ref) => {
        return (
            <div>ddd</div>
        )
    })

export default CloseTokenAccount;