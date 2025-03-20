import React from 'react';
import { Input, Select, Button, InputNumber, Switch } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { AttributeValue } from '../../types';

interface AttributeEditorProps {
  attribute: AttributeValue;
  value?: any;
  onAttributeChange: (updatedAttribute: AttributeValue) => void;
  onValueChange: (value: any) => void;
  onDelete: () => void;
}

const attributeTypes = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'url', label: 'URL' },
  { value: 'tags', label: 'Tags' },
  { value: 'boolean', label: 'Boolean' },
];

const renderAttributeInput = (type: AttributeValue['type'], value: any, onChange: (value: any) => void) => {
  switch (type) {
    case 'number':
      return <InputNumber style={{ width: '100%' }} value={value} onChange={onChange} />;
    case 'boolean':
      return <Switch checked={value} onChange={onChange} />;
    case 'url':
      return <Input type="url" value={value} onChange={e => onChange(e.target.value)} />;
    case 'tags':
      return (
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Enter tags"
          value={value}
          onChange={onChange}
        />
      );
    default:
      return <Input value={value} onChange={e => onChange(e.target.value)} />;
  }
};

export const AttributeEditor: React.FC<AttributeEditorProps> = ({
  attribute,
  value,
  onAttributeChange,
  onValueChange,
  onDelete,
}) => {
  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAttributeChange({
      ...attribute,
      label: e.target.value,
    });
  };

  const handleTypeChange = (type: AttributeValue['type']) => {
    onAttributeChange({
      ...attribute,
      type,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1, display: 'flex', gap: 8 }}>
          <Input
            value={attribute.label}
            onChange={handleLabelChange}
            placeholder="Attribute Label"
            style={{ flex: 2 }}
          />
          <Select
            value={attribute.type}
            onChange={handleTypeChange}
            style={{ flex: 1 }}
            options={attributeTypes}
          />
        </div>
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={onDelete}
        />
      </div>
      <div style={{ paddingLeft: 8 }}>
        {renderAttributeInput(attribute.type, value, onValueChange)}
      </div>
    </div>
  );
}; 