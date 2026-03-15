// Easing functions for premium animations — Glass Minimalist

export const easing = {
    // Ease out cubic - smooth deceleration
    easeOutCubic: [0.33, 1, 0.68, 1] as const,

    // Ease out expo - dramatic deceleration
    easeOutExpo: [0.16, 1, 0.3, 1] as const,

    // Ease in out cubic - smooth in-out
    easeInOutCubic: [0.65, 0, 0.35, 1] as const,

    // Spring - refined overshoot
    spring: { type: 'spring' as const, stiffness: 250, damping: 25, mass: 0.8 },

    // Soft spring — gentle, elegant
    softSpring: { type: 'spring' as const, stiffness: 120, damping: 20, mass: 1 },

    // Quick tween
    quickTween: { type: 'tween' as const, duration: 0.25, ease: [0.33, 1, 0.68, 1] as const },

    // Medium tween
    mediumTween: { type: 'tween' as const, duration: 0.5, ease: [0.65, 0, 0.35, 1] as const },
};

// Reusable Framer Motion variants
export const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.6, ease: easing.easeOutCubic },
};

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.4 },
};

export const scaleIn = {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.4, ease: easing.easeOutCubic },
};

export const slideInRight = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.5, ease: easing.easeOutCubic },
};

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

// For list items
export const staggerItem = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: easing.easeOutCubic },
};

// Pulse glow for active elements — sage green
export const pulseGlow = {
    animate: {
        boxShadow: [
            '0 0 0 0 rgba(134, 239, 172, 0)',
            '0 0 30px 8px rgba(134, 239, 172, 0.25)',
            '0 0 0 0 rgba(134, 239, 172, 0)',
        ],
    },
    transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut',
    },
};
