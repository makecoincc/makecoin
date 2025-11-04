import React, { useState, useCallback } from 'react';
import { Button, Input, Divider } from '@heroui/react';

export interface KeyValuePair {
  key: string;
  value: string;
}

interface KeyValueEditorProps {
  initialData?: KeyValuePair[];
  onChange?: (data: KeyValuePair[]) => void;
  maxItems?: number;
  className?: string;
  title?: string;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
}

export const KeyValueEditor: React.FC<KeyValueEditorProps> = ({
  initialData = [],
  onChange,
  maxItems = 20,
  className = '',
  title = 'Key-Value Editor',
  keyPlaceholder = 'Enter key',
  valuePlaceholder = 'Enter value'
}) => {
  const [data, setData] = useState<KeyValuePair[]>(initialData);

  // Update data and trigger onChange
  const updateData = useCallback((newData: KeyValuePair[]) => {
    setData(newData);
    onChange?.(newData);
  }, [onChange]);

  // Add new item
  const handleAdd = () => {
    if (data.length >= maxItems) return;
    
    const newData = [...data, { key: '', value: '' }];
    updateData(newData);
  };

  // Update item
  const handleUpdate = (index: number, field: 'key' | 'value', value: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    updateData(newData);
  };

  // Delete item
  const handleDelete = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    updateData(newData);
  };

  // Check if key is duplicate
  const isDuplicateKey = (key: string, currentIndex: number): boolean => {
    if (!key.trim()) return false;
    return data.some((item, index) => 
      index !== currentIndex && 
      item.key.toLowerCase() === key.toLowerCase()
    );
  };

  return (
    <div className={className}>
      <div>
        <div className="flex justify-between items-center bg-transparent pb-3">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {/* <p className="text-sm text-default-500">
              {data.length}/{maxItems} items
            </p> */}
          </div>
          <Button
            variant='flat'
            color="primary"
            size="sm"
            isIconOnly
            onPress={handleAdd}
            isDisabled={data.length >= maxItems}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
          </Button>
        </div>
        
        {/* <Divider /> */}
        
        <div>
          {data.length === 0 ? (
            <div className="text-center flex justify-center items-center py-4 text-default-400">
              {/* <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg> */}
              <Button
                variant='flat'
                color="primary"
                size="sm"
                fullWidth
                onPress={handleAdd}
                isDisabled={data.length >= maxItems}
                startContent={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>}
              >
                Add attribute
              </Button>
              {/* <p className="text-sm mt-1">Click the button above to add your first item</p> */}
            </div>
          ) : (
            <div className="space-y-4">
              {data.map((item, index) => {
                const keyError = isDuplicateKey(item.key, index);
                
                return (
                  <div key={index}>
                    <div className="flex items-center gap-3">
                      {/* Key-Value Inputs */}
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input
                          labelPlacement="outside"
                          placeholder={keyPlaceholder}
                          value={item.key}
                          onChange={(e) => handleUpdate(index, 'key', e.target.value)}
                          isInvalid={keyError}
                          errorMessage={keyError ? 'Duplicate key' : undefined}
                        />
                        <Input
                          labelPlacement="outside"
                          placeholder={valuePlaceholder}
                          value={item.value}
                          onChange={(e) => handleUpdate(index, 'value', e.target.value)}
                        />
                      </div>
                      
                      {/* Delete Button */}
                      <Button
                        variant="flat"
                        color="danger"
                        isIconOnly
                        size='sm'
                        onPress={() => handleDelete(index)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </Button>
                    </div>
                    
                    {/* Separator line except for last item */}
                    {/* {index < data.length - 1 && (
                      <Divider className="mt-4" />
                    )} */}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KeyValueEditor;