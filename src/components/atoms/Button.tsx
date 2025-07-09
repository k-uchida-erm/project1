import React from 'react';
import { ButtonProps } from '../../types/components';

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'secondary', 
  size = 'md',
  className = '',
  disabled = false 
}) => {
  const baseClasses = 'rounded-lg transition-all duration-200 font-medium border';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 border-transparent',
    secondary: 'border-slate-300/70 bg-white/80 backdrop-blur-sm text-slate-800 hover:bg-slate-50/90 hover:border-slate-400/70 shadow-sm hover:shadow-md',
    ghost: 'border-transparent hover:bg-slate-100/60 text-slate-700 hover:text-slate-800'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-sm'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <button 
      onClick={onClick} 
      className={classes}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button; 