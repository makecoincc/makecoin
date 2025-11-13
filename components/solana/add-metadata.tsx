
'use client';
import React, { useState, useRef } from "react";

type AddMetadataProps = React.HTMLAttributes<HTMLFormElement> & {
    onToolSelect?: (key: string) => void;
};

const AddMetadata = React.forwardRef<HTMLFormElement, AddMetadataProps>(
    ({ className, onToolSelect, ...props }, ref) => {
        return (
            <div>ddd</div>
        )
    })

export default AddMetadata

AddMetadata.displayName = 'AddMetadata';