'use client';
import React, { useState, useRef } from "react";

type CreateTokenProps = React.HTMLAttributes<HTMLFormElement> & {
    onToolSelect?: (key: string) => void;
};

const CreateToken = React.forwardRef<HTMLFormElement, CreateTokenProps>(
    ({ className, onToolSelect, ...props }, ref) => {
        return (
            <div>CreateToken</div>
        )
    })

export default CreateToken;

CreateToken.displayName = 'CreateToken';