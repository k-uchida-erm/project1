import React from 'react';
import { InputProps } from '../../types/components';

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  onKeyPress,
  placeholder,
  className = '',
  type = 'text',
  disabled = false
}) => {
  const baseClasses = 'outline-none transition-all duration-200';
  const classes = `${baseClasses} ${className}`;

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      className={classes}
      disabled={disabled}
    />
  );
};

export default Input; 