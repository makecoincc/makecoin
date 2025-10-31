import React, { useState } from 'react';
import { Button } from '@heroui/react';
import {CopyLinearIcon, CheckLinearIcon} from "@heroui/shared-icons";
interface CopyButtonProps {
    /** Full text string for copying */
    fullText: string;
    /** Success message after copying */
    copySuccessText?: string;
    /** Error message when copy fails */
    copyErrorText?: string;
    onCopy?: (text: string) => void;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
    fullText,
    // copySuccessText = 'Copied!',
    // copyErrorText = 'Failed to copy',
    onCopy,
}) => {
    const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Handle copy operation
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(fullText);
            setCopyStatus('success');
            onCopy?.(fullText);

            // Reset status after 2 seconds
            setTimeout(() => setCopyStatus('idle'), 2000);
        } catch (error) {
            setCopyStatus('error');
            console.error('Failed to copy text:', error);

            // Reset status after 2 seconds
            setTimeout(() => setCopyStatus('idle'), 2000);
        }
    };
    return (
        <Button
            variant="light"
            color="success"
            isIconOnly
            onPress={() => handleCopy()}
        >
            {copyStatus === 'success' ? <CheckLinearIcon className="w-6 h-6" /> : <CopyLinearIcon className="w-6 h-6" />}
        </Button>
    )
}

