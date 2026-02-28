import { motion } from 'framer-motion';
import { GlyphSVG } from '../utils/glyphs';
import { config } from '../data/config';

export const Questions = () => {
    return (
        <section id="questions" className="section relative py-20">
            <div className="absolute inset-0 bg-grid opacity-20" />

            <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
                <div className="space-y-8">
                    {/* Question mark glyph */}
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <GlyphSVG seed="questions-glyph" size={100} color="#8B5CF6" />
                        </motion.div>
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        ¿Preguntas?
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-2xl md:text-3xl text-gray-400"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Turno de preguntas sobre el TFG
                    </motion.p>

                    {/* Author card */}
                    <motion.div
                        className="mt-12 inline-block"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="glass p-8 rounded-2xl border border-accent/30">
                            <GlyphSVG seed="author-avatar" size={60} color="#A78BFA" className="mx-auto mb-4" />
                            <p className="text-2xl font-semibold text-white mb-2">
                                {config.author}
                            </p>
                            <p className="text-accent-light">
                                Autor del TFG
                            </p>
                        </div>
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        className="w-32 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto my-8"
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    />

                    {/* End presentation button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <motion.button
                            onClick={() => document.getElementById('thanks')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 rounded-xl font-medium text-lg bg-accent hover:bg-accent-dark text-white transition-all flex items-center gap-3 mx-auto"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path
                                    d="M10 18L3 10L10 2M17 10H3"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    transform="rotate(180 10 10)"
                                />
                            </svg>
                            Finalizar Presentación
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

