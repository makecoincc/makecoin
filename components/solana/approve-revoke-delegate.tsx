'use client';
import React, { useState, useRef } from "react";

type ApproveRevokeDelegateProps = React.HTMLAttributes<HTMLFormElement> & {
    onToolSelect?: (key: string) => void;
};

const ApproveRevokeDelegate = React.forwardRef<HTMLFormElement, ApproveRevokeDelegateProps>(
    ({ className, onToolSelect, ...props }, ref) => {
        return (
            <div>ddd</div>
        )
    })

export default ApproveRevokeDelegate
ApproveRevokeDelegate.displayName = 'ApproveRevokeDelegate';