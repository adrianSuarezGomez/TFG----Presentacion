import { motion, useReducedMotion } from 'framer-motion';
import { Aurora } from '../components/Aurora';
import { config } from '../data/config';
import { GlyphSVG } from '../utils/glyphs';

export const Hero = () => {
    const shouldReduceMotion = useReducedMotion();

    const scrollToHealing = () => {
        const element = document.getElementById('the-healing');
        if (element) {
            element.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
        }
    };

    return (
        <section
            id="hero"
            className="section min-h-screen relative overflow-hidden flex items-center justify-center"
        >
            {/* Aurora background — high intensity */}
            <Aurora intensity="high" />

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-grid opacity-30" />

            {/* Content */}
            <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
                {/* Context badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2.5 badge mb-12"
                >
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="tracking-widest">{config.context}</span>
                </motion.div>

                {/* Main title — DRAMATIC gradient text */}
                <motion.h1
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="title-xl mb-8"
                >
                    <span className="block text-white text-glow">Tests break.</span>
                    <span className="block gradient-text" style={{ fontSize: '110%' }}>We heal them.</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7, ease: [0.33, 1, 0.68, 1] }}
                    className="subtitle mb-10 max-w-2xl mx-auto"
                >
                    {config.title}
                </motion.p>

                {/* Author signature with gradient lines */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.9, ease: [0.33, 1, 0.68, 1] }}
                    className="flex items-center justify-center gap-5 mb-14"
                >
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                    <span className="text-lg gradient-text-warm font-display font-semibold tracking-wide">
                        {config.author}
                    </span>
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                </motion.div>

                {/* CTA Button — with shimmer border */}
                <motion.button
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1, ease: [0.33, 1, 0.68, 1] }}
                    onClick={scrollToHealing}
                    className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-surface-elevated/80 backdrop-blur-xl border border-accent/20 transition-all duration-500 hover:border-accent/40 hover:shadow-[0_0_40px_-10px_rgba(134,239,172,0.3)]"
                    whileHover={{ scale: 1.04, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <span className="relative z-10 text-lg font-display font-semibold text-white">Ver el self-healing</span>
                    {/* Animated arrow */}
                    <motion.svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="text-accent relative z-10"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <path
                            d="M10 4L10 16M10 16L16 10M10 16L4 10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </motion.svg>
                </motion.button>

                {/* Decorative glyphs — more visible */}
                <motion.div
                    className="absolute top-1/4 left-8 opacity-20"
                    animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <GlyphSVG seed="hero-deco-1" size={90} color="#86EFAC" />
                </motion.div>
                <motion.div
                    className="absolute bottom-1/4 right-8 opacity-20"
                    animate={{ y: [0, 12, 0], rotate: [0, -3, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                >
                    <GlyphSVG seed="hero-deco-2" size={70} color="#22D3EE" />
                </motion.div>
                <motion.div
                    className="absolute top-1/3 right-1/4 opacity-10"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
                >
                    <GlyphSVG seed="hero-deco-3" size={120} color="#86EFAC" />
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="w-7 h-11 rounded-full border-2 border-accent/30 flex items-start justify-center p-2">
                    <motion.div
                        className="w-1.5 h-2.5 rounded-full bg-accent"
                        animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>
            </motion.div>
        </section>
    );
};
