import React from 'react';
import { motion } from 'framer-motion';

export const NeonButton = ({ children, onClick, disabled, className = '', variant = 'primary' }) => {
    const baseStyle = "relative px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-transparent border border-[var(--color-neon-blue)] text-[var(--color-neon-blue)] hover:bg-[var(--color-neon-blue)] hover:text-black hover:shadow-[0_0_20px_var(--color-neon-blue)]",
        secondary: "bg-transparent border border-[var(--color-neon-purple)] text-[var(--color-neon-purple)] hover:bg-[var(--color-neon-purple)] hover:text-black hover:shadow-[0_0_20px_var(--color-neon-purple)]",
        danger: "bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-black hover:shadow-[0_0_20px_rgba(239,68,68,1)]"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${variants[variant]} ${className}`}
        >
            {children}
        </motion.button>
    );
};
