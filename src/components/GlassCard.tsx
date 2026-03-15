import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
    children: ReactNode;
    variant?: 'default' | 'strong';
    className?: string;
    hoverEffect?: boolean;
    glowOnHover?: boolean;
}

export const GlassCard = ({
    children,
    variant = 'default',
    className = '',
    hoverEffect = true,
    glowOnHover = false,
}: GlassCardProps) => {
    const baseClass = variant === 'strong' ? 'glass-strong' : 'glass';

    return (
        <motion.div
            className={`${baseClass} gradient-border rounded-2xl relative ${className}`}
            whileHover={
                hoverEffect
                    ? {
                        y: -6,
                        scale: 1.005,
                        transition: { type: 'spring', stiffness: 400, damping: 25 },
                    }
                    : undefined
            }
            style={{
                willChange: hoverEffect ? 'transform' : 'auto',
            }}
        >
            {/* Hover glow overlay */}
            {glowOnHover && (
                <div className="absolute inset-0 rounded-2xl bg-accent/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            )}
            {children}
        </motion.div>
    );
};

interface StatCardProps {
    value: string | number;
    label: string;
    trend?: 'up' | 'down' | 'neutral';
    className?: string;
}

export const StatCard = ({
    value,
    label,
    trend = 'neutral',
    className = '',
}: StatCardProps) => {
    const trendColor = trend === 'up' ? 'text-accent' : trend === 'down' ? 'text-red-400' : 'text-white';

    return (
        <GlassCard className={`p-5 ${className}`} hoverEffect={true} glowOnHover>
            <div className={`font-display text-4xl font-bold stat-glow ${trendColor} mb-2`}>
                {value}
            </div>
            <div className="text-sm text-muted">{label}</div>
            {trend === 'up' && (
                <div className="absolute top-3 right-3">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-accent">
                        <path d="M7 11V3M7 3L3 7M7 3L11 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            )}
        </GlassCard>
    );
};
