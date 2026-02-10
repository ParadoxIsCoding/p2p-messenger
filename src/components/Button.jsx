import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = ({ children, onClick, disabled, className = '', variant = 'primary', ...props }) => {
    const baseStyle = "relative px-4 py-2 rounded-md font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] text-[var(--color-text-primary)] border border-[var(--color-border)]",
        secondary: "bg-transparent hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-white",
        danger: "bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            disabled={disabled}
            className={twMerge(baseStyle, variants[variant], className)}
            {...props}
        >
            {children}
        </motion.button>
    );
};
