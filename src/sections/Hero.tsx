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
            {/* Aurora background */}
            <Aurora intensity="high" />

            {/* Content */}
            <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
                {/* Context badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8"
                >
                    <GlyphSVG seed="context-badge" size={16} color="#A78BFA" />
                    <span className="text-sm text-gray-400">{config.context}</span>
                </motion.div>

                {/* Main title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="title-xl text-white mb-6"
                >
                    <span className="text-glow">Tests break.</span>
                    <br />
                    <span className="text-accent-light">We heal them.</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="subtitle text-gray-300 mb-8 max-w-2xl mx-auto"
                >
                    {config.title}
                </motion.p>

                {/* Author signature */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex items-center justify-center gap-3 mb-12"
                >
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
                    <span className="text-lg text-accent-light font-medium">
                        {config.author}
                    </span>
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
                </motion.div>

                {/* CTA Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    onClick={scrollToHealing}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-accent/10 border border-accent/30 hover:border-accent/60 hover:bg-accent/20 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="text-lg font-medium text-white">Ver el self-healing</span>
                    {/* Arrow icon custom */}
                    <motion.svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="text-accent"
                        animate={{ y: [0, 4, 0] }}
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

                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                </motion.button>

                {/* Decorative glyphs */}
                <div className="absolute top-1/4 left-8 opacity-20">
                    <GlyphSVG seed="hero-deco-1" size={80} color="#8B5CF6" />
                </div>
                <div className="absolute bottom-1/4 right-8 opacity-20">
                    <GlyphSVG seed="hero-deco-2" size={60} color="#A78BFA" />
                </div>
                <div className="absolute top-1/2 left-1/4 opacity-10">
                    <GlyphSVG seed="hero-deco-3" size={100} color="#7C3AED" />
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-2">
                    <motion.div
                        className="w-1.5 h-2 rounded-full bg-accent"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>
            </motion.div>
        </section>
    );
};
