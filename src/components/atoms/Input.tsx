import React from 'react';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  type?: string;
  disabled?: boolean;
}

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