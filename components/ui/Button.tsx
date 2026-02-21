import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

const PRIMARY_STYLE: React.CSSProperties = {
  backgroundColor: '#1e3470',
  boxShadow: '0 4px 14px rgba(30,52,112,0.30)',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  style,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "text-white border border-transparent",
    secondary: "bg-white text-black border border-gray-200 hover:border-gray-400 hover:shadow-md",
    outline: "bg-transparent text-gray-600 border border-gray-200 hover:text-black hover:border-black",
  };

  const sizes = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-6 py-3",
    lg: "text-lg px-8 py-4",
  };

  // For primary variant, merge brand navy as default bg — callsite style prop overrides take priority
  const mergedStyle = variant === 'primary'
    ? { ...PRIMARY_STYLE, ...style }
    : style;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={mergedStyle}
      {...props}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </motion.button>
  );
};