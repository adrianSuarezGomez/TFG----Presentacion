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
                        'radial-gradient(circle at 50% 50%, rgba(134, 239, 172, 0.08) 0%, transparent 60%)',
                        'radial-gradient(circle at 50% 50%, rgba(134, 239, 172, 0.18) 0%, transparent 60%)',
                        'radial-gradient(circle at 50% 50%, rgba(134, 239, 172, 0.08) 0%, transparent 60%)',
                    ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
                <div className="space-y-8">
                    {/* Animated glyph */}
                    <div className="flex justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                        >
                            <GlyphSVG seed="live-demo-main" size={120} color="#86EFAC" />
                        </motion.div>
                    </div>

                    {/* Main heading */}
                    <h1 className="font-display text-5xl md:text-7xl font-bold text-white">
                        Live Demo
                    </h1>

                    {/* Subtitle */}
                    <div className="h-4" />
                    <p className="text-lg text-muted-light max-w-2xl mx-auto">
                        Demostración en vivo del sistema de self-healing con Playwright y LLM local.
                    </p>

                    {/* Video Embed */}
                    <motion.div
                        className="relative mt-4 rounded-2xl overflow-hidden glass-strong border-accent/20 shadow-2xl shadow-accent/10 z-20 group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Glow Behind the Video */}
                        <div className="absolute inset-0 bg-accent/8 blur-2xl group-hover:bg-accent/15 transition-all duration-700 pointer-events-none" />

                        <video
                            controls
                            className="w-full aspect-video outline-none relative z-10 rounded-xl"
                            preload="metadata"
                        >
                            <source src="/videos/Auto-Reparación_de_Locators.mp4" type="video/mp4" />
                            Tu navegador no soporta el formato de vídeo.
                        </video>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
