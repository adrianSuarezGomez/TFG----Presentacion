import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps extends HTMLMotionProps<'div'> {
    children: ReactNode;
    variant?: 'default' | 'strong' | 'accent';
    hover?: boolean;
    className?: string;
}

export const GlassCard = ({
    children,
    variant = 'default',
    hover = true,
    className = '',
    ...props
}: GlassCardProps) => {
    const baseStyles = 'rounded-2xl transition-all duration-300';

    const variantStyles = {
        default: 'glass',
        strong: 'glass-strong',
        accent: 'glass border-accent/30 glow-accent',
    };

    const hoverStyles = hover
        ? 'hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10'
        : '';

    return (
        <motion.div
            className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
            whileHover={hover ? { y: -2, scale: 1.01 } : undefined}
            transition={{ duration: 0.2 }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// Variante para contenido principal
interface ContentCardProps {
    children: ReactNode;
    title?: string;
    className?: string;
}

export const ContentCard = ({ children, title, className = '' }: ContentCardProps) => {
    return (
        <GlassCard className={`p-6 md:p-8 ${className}`}>
            {title && (
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                    {title}
                </h3>
            )}
            {children}
        </GlassCard>
    );
};

// Stat card para métricas
interface StatCardProps {
    value: string | number;
    label: string;
    suffix?: string;
    trend?: 'up' | 'down' | 'neutral';
    className?: string;
}

export const StatCard = ({ value, label, suffix = '', trend, className = '' }: StatCardProps) => {
    const trendColors = {
        up: 'text-green-400',
        down: 'text-red-400',
        neutral: 'text-gray-400',
    };

    return (
        <GlassCard className={`p-5 md:p-6 text-center ${className}`}>
            <div className="flex items-baseline justify-center gap-1">
                <span className={`text-3xl md:text-4xl font-bold ${trend ? trendColors[trend] : 'text-accent-light'}`}>
                    {value}
                </span>
                {suffix && (
                    <span className="text-lg text-gray-400">{suffix}</span>
                )}
            </div>
            <p className="text-sm md:text-base text-gray-400 mt-2">{label}</p>
        </GlassCard>
    );
};
