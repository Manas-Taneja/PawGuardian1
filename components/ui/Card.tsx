import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noHover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', noHover = false }) => {
  return (
    <motion.div
      whileHover={noHover ? {} : { y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      className={`bg-white rounded-2xl border border-gray-100 p-6 shadow-sm transition-colors ${className}`}
    >
      {children}
    </motion.div>
  );
};