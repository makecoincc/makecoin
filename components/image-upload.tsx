import React, { useState, useRef } from 'react';
import { Card, CardBody } from '@heroui/react';
import { Icon } from "@iconify/react";
import Image from 'next/image';

interface ImageUploadProps {
  onImageSelect?: (file: File) => void;
  onImageUrl?: (url: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  accept?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  onImageUrl,
  className = '',
  size = 'md',
  accept = 'image/*'
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeConfig = {
    sm: { width: 'w-24', height: 'h-24', icon: 'text-2xl' },
    md: { width: 'w-32', height: 'h-32', icon: 'text-3xl' },
    lg: { width: 'w-40', height: 'h-40', icon: 'text-4xl' }
  };

  const currentSize = sizeConfig[size];

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setPreview(url);
        onImageUrl?.(url);
      };
      reader.readAsDataURL(file);
      onImageSelect?.(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageUrl?.('');
  };

  return (
    <div className={`relative ${className}`}>
      <Card
        className={`
          ${currentSize.width} ${currentSize.height} 
          cursor-pointer transition-all duration-200 
          ${isDragging ? 'border-primary border-2 bg-primary/10' : 'border-dashed border-2 border-default-300 hover:border-primary/50'}
          ${preview ? 'border-solid border-default-200' : ''}
        `}
        isPressable
        onPress={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardBody className="p-0 flex items-center justify-center overflow-hidden">
          {preview ? (
            <div className="relative w-full h-full group">
              <Image
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-lg">
                {/* <button
                  onClick={handleRemove}
                  className="bg-white text-black rounded-full hover:bg-gray-100 transition-colors"
                  type="button"
                > */}
                  <Icon
                    onClick={handleRemove}
                    icon="solar:close-circle-bold"
                    className="w-8 h-8 text-black rounded-full hover:bg-gray-100 transition-colors"
                  />
                {/* </button> */}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-default-400 space-y-2">
              {/* Upload icon */}
              <Icon
                icon="mingcute:upload-line"
                className={`${currentSize.icon} ${isDragging ? 'text-primary' : ''}`}
              />
              {size !== 'sm' && (
                <div className="text-center">
                  <p className="text-xs font-medium">
                    {isDragging ? 'Release to upload' : ''}
                  </p>
                  {size === 'lg' && (
                    <p className="text-xs text-default-300 mt-1">
                      or drag and drop image here
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </CardBody>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;