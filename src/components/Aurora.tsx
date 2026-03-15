import { motion } from 'framer-motion';

interface AuroraProps {
    intensity?: 'low' | 'medium' | 'high';
}

export const Aurora = ({ intensity = 'medium' }: AuroraProps) => {
    const opacityMap = { low: 0.25, medium: 0.4, high: 0.55 };
    const opacity = opacityMap[intensity];

    return (
        <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ opacity }}
        >
            {/* Main sage green blob — large and visible */}
            <motion.div
                className="absolute rounded-full blur-[120px]"
                style={{
                    width: '55vw',
                    height: '55vw',
                    background: 'radial-gradient(circle, rgba(134, 239, 172, 0.2) 0%, rgba(74, 222, 128, 0.08) 50%, transparent 80%)',
                    top: '10%',
                    left: '-10%',
                }}
                animate={{
                    x: [0, 100, 50, 0],
                    y: [0, 60, -30, 0],
                    scale: [1, 1.15, 0.95, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Cyan accent blob — secondary glow */}
            <motion.div
                className="absolute rounded-full blur-[100px]"
                style={{
                    width: '40vw',
                    height: '40vw',
                    background: 'radial-gradient(circle, rgba(34, 211, 238, 0.12) 0%, rgba(34, 211, 238, 0.04) 50%, transparent 80%)',
                    bottom: '5%',
                    right: '-5%',
                }}
                animate={{
                    x: [0, -80, -20, 0],
                    y: [0, -50, 30, 0],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 3,
                }}
            />

            {/* Tertiary smaller accent blob */}
            <motion.div
                className="absolute rounded-full blur-[90px]"
                style={{
                    width: '25vw',
                    height: '25vw',
                    background: 'radial-gradient(circle, rgba(134, 239, 172, 0.15) 0%, transparent 70%)',
                    top: '40%',
                    right: '20%',
                }}
                animate={{
                    x: [0, -50, 30, 0],
                    y: [0, 40, -20, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 6,
                }}
            />

            {/* Top bright highlight */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[1px]"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(134, 239, 172, 0.15) 30%, rgba(34, 211, 238, 0.1) 50%, rgba(134, 239, 172, 0.15) 70%, transparent)',
                }}
            />
        </div>
    );
};
