import React, { useState } from 'react';
import { extendVariants, Snippet, SnippetProps } from "@heroui/react";

// Define truncate position type
type TruncatePosition = 'start' | 'middle' | 'end';

// Extend Snippet component styles
const AddressSnippetBase = extendVariants(Snippet, {
    variants: {
        color: {
            primary: {
                base: "bg-primary/10 border-primary/20",
                content: "text-primary-700",
                copyButton: "text-primary-600 hover:text-primary-800"
            },
            secondary: {
                base: "bg-secondary/10 border-secondary/20",
                content: "text-secondary-700",
                copyButton: "text-secondary-600 hover:text-secondary-800"
            },
            success: {
                base: "bg-success/10 border-success/20",
                content: "text-success-700",
                copyButton: "text-success-600 hover:text-success-800"
            },
            warning: {
                base: "bg-warning/10 border-warning/20",
                content: "text-warning-700",
                copyButton: "text-warning-600 hover:text-warning-800"
            },
            danger: {
                base: "bg-danger/10 border-danger/20",
                content: "text-danger-700",
                copyButton: "text-danger-600 hover:text-danger-800"
            }
        }
    },
    defaultVariants: {
        color: "default"
    }
});

interface AddressSnippetProps extends Omit<SnippetProps, 'children'> {
    /** Full text string for copying */
    fullText: string;
    /** Shortened display text, auto-truncated if not provided */
    displayText?: string;
    /** Maximum length for auto-truncation */
    maxLength?: number;
    /** Truncate position: start, middle, or end */
    truncatePosition?: TruncatePosition;
    /** Ellipsis character */
    ellipsis?: string;
    /** Whether to show tooltip with full content */
    showTooltip?: boolean;
    /** Success message after copying */
    copySuccessText?: string;
    /** Error message when copy fails */
    copyErrorText?: string;
    /** Whether to hide the $ symbol prefix */
    hideSymbol?: boolean;
}

// String truncation function
const truncateString = (
    str: string,
    maxLength: number,
    position: TruncatePosition = 'end',
    ellipsis: string = '...'
): string => {
    if (str.length <= maxLength) return str;

    switch (position) {
        case 'start':
            return ellipsis + str.slice(-(maxLength - ellipsis.length));
        case 'middle':
            const halfLength = Math.floor((maxLength - ellipsis.length) / 2);
            return str.slice(0, halfLength) + ellipsis + str.slice(-halfLength);
        case 'end':
        default:
            return str.slice(0, maxLength - ellipsis.length) + ellipsis;
    }
};

export const AddressSnippet: React.FC<AddressSnippetProps> = ({
    fullText,
    displayText,
    maxLength = 40,
    truncatePosition = 'middle',
    ellipsis = '...',
    showTooltip = true,
    copySuccessText = 'Copied!',
    copyErrorText = 'Failed to copy',
    hideSymbol = true,
    onCopy,
    ...props
}) => {
    const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Determine display text
    const textToDisplay = displayText || truncateString(fullText, maxLength, truncatePosition || 'middle', ellipsis);

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

    // Get copy button tooltip text
    const getCopyTooltip = () => {
        switch (copyStatus) {
            case 'success':
                return copySuccessText;
            case 'error':
                return copyErrorText;
            default:
                return 'Copy to clipboard';
        }
    };

    return (
        <div className="relative group">
            <AddressSnippetBase
                {...props}
                hideSymbol={hideSymbol}
                onCopy={handleCopy}
                copyButtonProps={{
                    ...props.copyButtonProps,
                    'aria-label': getCopyTooltip(),
                    className: `transition-colors ${copyStatus === 'success' ? 'text-success' : copyStatus === 'error' ? 'text-danger' : ''}`
                }}
            >
                <span
                    className="font-mono"
                    title={showTooltip ? fullText : undefined}
                >
                    {textToDisplay}
                </span>
            </AddressSnippetBase>

            {/* Copy status indicator */}
            {copyStatus !== 'idle' && (
                <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs text-white z-10 ${copyStatus === 'success' ? 'bg-success' : 'bg-danger'
                    }`}>
                    {copyStatus === 'success' ? copySuccessText : copyErrorText}
                </div>
            )}
        </div>
    );
};

export default AddressSnippet;