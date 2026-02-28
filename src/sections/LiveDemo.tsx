import { motion } from 'framer-motion';
import { GlyphSVG } from '../utils/glyphs';

export const LiveDemo = () => {
    return (
        <section id="live-demo" className="section relative py-20">
            <div className="absolute inset-0 bg-grid opacity-20" />

            {/* Animated background glow */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                    background: [
                        'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 60%)',
                        'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.25) 0%, transparent 60%)',
                        'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 60%)',
                    ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
                <div className="space-y-8">
                    {/* Animated glyph */}
                    <div className="flex justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        >
                            <GlyphSVG seed="live-demo-main" size={120} color="#8B5CF6" />
                        </motion.div>
                    </div>

                    {/* Main heading */}
                    <h1 className="text-5xl md:text-7xl font-bold text-white">
                        Live Demo
                    </h1>

                    {/* Subtitle with pulse effect */}
                    <div>
                        <motion.p
                            className="text-2xl md:text-3xl text-accent-light"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Comenzando en breves...
                        </motion.p>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Demostración en vivo del sistema de self-healing con Playwright y LLM local.
                    </p>

                    {/* Progress indicator */}
                    <div className="flex justify-center gap-2 py-6">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-3 h-3 rounded-full bg-accent"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                }}
                            />
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto" />

                    {/* Questions button */}
                    <div className="pt-8">
                        <p className="text-gray-500 mb-4">¿Terminó la demo?</p>
                        <motion.button
                            onClick={() => document.getElementById('questions')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 rounded-xl font-medium text-lg bg-accent hover:bg-accent-dark text-white transition-all flex items-center gap-3 mx-auto"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" />
                                <text x="10" y="14" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">?</text>
                            </svg>
                            Preguntas y Respuestas
                        </motion.button>
                    </div>

                    {/* Footer note */}
                    <p className="text-sm text-gray-600 pt-8">
                        Gracias por su atención
                    </p>
                </div>
            </div>
        </section>
    );
};
