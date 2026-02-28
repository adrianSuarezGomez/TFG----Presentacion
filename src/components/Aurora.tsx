import { motion, useReducedMotion } from 'framer-motion';

interface AuroraProps {
    className?: string;
    intensity?: 'low' | 'medium' | 'high';
}

export const Aurora = ({ className = '', intensity = 'medium' }: AuroraProps) => {
    const shouldReduceMotion = useReducedMotion();

    const opacityMap = {
        low: 0.15,
        medium: 0.25,
        high: 0.35,
    };

    const opacity = opacityMap[intensity];

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {/* Grid de fondo */}
            <div className="absolute inset-0 bg-grid opacity-50" />

            {/* Aurora blobs */}
            <motion.div
                className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%]"
                animate={shouldReduceMotion ? {} : {
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 120,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            >
                {/* Blob principal - violeta */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[40%] h-[40%] rounded-full"
                    style={{
                        background: `radial-gradient(circle, rgba(139, 92, 246, ${opacity}) 0%, transparent 70%)`,
                        filter: 'blur(80px)',
                    }}
                    animate={shouldReduceMotion ? {} : {
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />

                {/* Blob secundario - violet light */}
                <motion.div
                    className="absolute top-1/2 right-1/4 w-[35%] h-[35%] rounded-full"
                    style={{
                        background: `radial-gradient(circle, rgba(167, 139, 250, ${opacity * 0.8}) 0%, transparent 70%)`,
                        filter: 'blur(100px)',
                    }}
                    animate={shouldReduceMotion ? {} : {
                        scale: [1.1, 1, 1.1],
                        x: [0, -40, 0],
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 5,
                    }}
                />

                {/* Blob terciario - púrpura oscuro */}
                <motion.div
                    className="absolute bottom-1/4 left-1/2 w-[30%] h-[30%] rounded-full"
                    style={{
                        background: `radial-gradient(circle, rgba(124, 58, 237, ${opacity * 0.6}) 0%, transparent 70%)`,
                        filter: 'blur(90px)',
                    }}
                    animate={shouldReduceMotion ? {} : {
                        scale: [1, 1.15, 1],
                        x: [0, 30, 0],
                        y: [0, 40, 0],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 8,
                    }}
                />
            </motion.div>

            {/* Noise overlay */}
            <div className="absolute inset-0 noise-overlay" />
        </div>
    );
};
