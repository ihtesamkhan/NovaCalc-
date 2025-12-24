
import React from 'react';

interface ButtonProps {
  label: string | React.ReactNode;
  onClick: () => void;
  variant?: 'number' | 'operator' | 'action' | 'equal';
  className?: string;
  span?: 1 | 2;
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'number', 
  className = '', 
  span = 1 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'operator':
        return 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 active:scale-95';
      case 'action':
        return 'bg-white/10 text-white hover:bg-white/20 active:scale-95';
      case 'equal':
        return 'bg-blue-500 text-white hover:bg-blue-400 shadow-lg shadow-blue-500/30 active:scale-95';
      default:
        return 'bg-white/5 text-slate-300 hover:bg-white/10 active:scale-95';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${getVariantStyles()}
        ${span === 2 ? 'col-span-2' : 'col-span-1'}
        h-16 md:h-20 rounded-2xl flex items-center justify-center text-xl md:text-2xl font-medium
        transition-all duration-200 ease-in-out border border-white/5
        ${className}
      `}
    >
      {label}
    </button>
  );
};

export default Button;
