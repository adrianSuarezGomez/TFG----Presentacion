import { motion } from 'framer-motion';
import { GlyphSVG } from '../utils/glyphs';
import { config } from '../data/config';

export const Thanks = () => {
    return (
        <section id="thanks" className="section relative py-20">
            <div className="absolute inset-0 bg-grid opacity-20" />

            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
                <div className="space-y-10">
                    {/* Thank you glyph */}
                    <div className="flex justify-center">
                        <motion.div
                            animate={{
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.02, 1]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <GlyphSVG seed="thanks-glyph" size={120} color="#8B5CF6" />
                        </motion.div>
                    </div>

                    {/* Main heading */}
                    <h1 className="text-5xl md:text-7xl font-bold text-white">
                        ¡Gracias!
                    </h1>

                    {/* TFG Title */}
                    <div className="space-y-2">
                        <p className="text-sm text-gray-500 uppercase tracking-wider">
                            Trabajo de Fin de Grado
                        </p>
                        <h2 className="text-2xl md:text-3xl font-semibold text-accent-light max-w-2xl mx-auto leading-relaxed">
                            {config.title}
                        </h2>
                    </div>

                    {/* Conclusion quote */}
                    <div className="glass p-6 rounded-xl border border-accent/30 max-w-2xl mx-auto">
                        <blockquote className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
                            "La IA no sustituye al QA.
                            <br />
                            <span className="text-accent-light">Lo convierte en un ingeniero aumentado.</span>"
                        </blockquote>
                        <p className="text-gray-500 mt-3 text-sm">— Conclusión del TFG</p>
                    </div>

                    {/* Divider */}
                    <div className="w-48 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto" />

                    {/* Credits */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                        {/* Author */}
                        <div className="glass p-6 rounded-xl border border-accent/20">
                            <GlyphSVG seed="author-credit" size={48} color="#A78BFA" className="mx-auto mb-3" />
                            <p className="text-sm text-gray-500 mb-1">Autor</p>
                            <p className="text-xl font-semibold text-white">
                                {config.author}
                            </p>
                        </div>

                        {/* Tutor */}
                        <div className="glass p-6 rounded-xl border border-accent/20">
                            <GlyphSVG seed="tutor-credit" size={48} color="#A78BFA" className="mx-auto mb-3" />
                            <p className="text-sm text-gray-500 mb-1">Tutor</p>
                            <p className="text-xl font-semibold text-white">
                                {config.tutor}
                            </p>
                        </div>
                    </div>


                    {/* Restart button */}
                    <div className="pt-8">
                        <motion.button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="px-6 py-3 rounded-xl font-medium text-gray-400 border border-gray-700 hover:border-accent/50 hover:text-white transition-all flex items-center gap-2 mx-auto"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path
                                    d="M8 12V4M8 4L4 8M8 4L12 8"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Volver al inicio
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
};

