'use client';
import React, { useState, useRef } from "react";

type SetAuthorityProps = React.HTMLAttributes<HTMLFormElement> & {
    onToolSelect?: (key: string) => void;
};

const SetAuthority = React.forwardRef<HTMLFormElement, SetAuthorityProps>(
    ({ className, onToolSelect, ...props }, ref) => {
        return (
            <div>ddd</div>
        )
    })

export default SetAuthority;

SetAuthority.displayName = 'SetAuthority';