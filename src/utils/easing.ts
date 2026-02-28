// Funciones de easing para animaciones premium

export const easing = {
    // Ease out cubic - desaceleración suave
    easeOutCubic: [0.33, 1, 0.68, 1] as const,

    // Ease out expo - desaceleración dramática
    easeOutExpo: [0.16, 1, 0.3, 1] as const,

    // Ease in out cubic - suave entrada y salida
    easeInOutCubic: [0.65, 0, 0.35, 1] as const,

    // Spring - rebote sutil
    spring: { type: 'spring', stiffness: 300, damping: 30 } as const,

    // Spring suave
    softSpring: { type: 'spring', stiffness: 150, damping: 25 } as const,

    // Tween rápido
    quickTween: { type: 'tween', duration: 0.2, ease: [0.33, 1, 0.68, 1] } as const,

    // Tween medio
    mediumTween: { type: 'tween', duration: 0.4, ease: [0.65, 0, 0.35, 1] } as const,
};

// Variantes de Framer Motion reutilizables
export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.4, ease: easing.easeOutCubic },
};

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
};

export const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.3, ease: easing.easeOutCubic },
};

export const slideInRight = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.4, ease: easing.easeOutCubic },
};

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

// Para listas de items
export const staggerItem = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: easing.easeOutCubic },
};

// Animación de pulso para elementos activos
export const pulseGlow = {
    animate: {
        boxShadow: [
            '0 0 0 0 rgba(139, 92, 246, 0)',
            '0 0 20px 5px rgba(139, 92, 246, 0.3)',
            '0 0 0 0 rgba(139, 92, 246, 0)',
        ],
    },
    transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
    },
};
