import { motion } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';
import { GlyphSVG } from '../utils/glyphs';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/easing';

const keyPoints = [
    {
        icon: 'automated-tests',
        title: 'Pruebas Automatizadas',
        description:
            'Sustitución de la ejecución manual por scripts para agilizar el feedback del desarrollo.',
        color: '#86EFAC',
    },
    {
        icon: 'e2e-tests',
        title: 'Pruebas End-to-End (E2E)',
        description:
            'Validación del flujo completo del usuario, desde la interfaz hasta la base de datos.',
        color: '#22D3EE',
    },
    {
        icon: 'the-challenge',
        title: 'El Desafío',
        description:
            'La dependencia crítica de los localizadores: nuestra forma de "ver" e interactuar con la web.',
        color: '#F59E0B',
    },
    {
        icon: 'applicability',
        title: 'Aplicabilidad',
        description:
            'Ideal para entornos de Integración Continua (CI) y aplicaciones con cambios frecuentes.',
        color: '#A78BFA',
    },
];

export const TechContext = () => {
    return (
        <section id="tech-context" className="section relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-grid opacity-20" />

            {/* Subtle decorative elements */}
            <motion.div
                className="absolute top-20 right-10 opacity-10"
                animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            >
                <GlyphSVG seed="tech-deco-1" size={100} color="#22D3EE" />
            </motion.div>
            <motion.div
                className="absolute bottom-20 left-10 opacity-10"
                animate={{ y: [0, 12, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
                <GlyphSVG seed="tech-deco-2" size={80} color="#86EFAC" />
            </motion.div>

            <div className="relative z-10 w-full mx-auto">
                {/* Header */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: '-100px' }}
                    className="mb-8 text-center"
                >
                    <motion.div variants={staggerItem} className="flex items-center justify-center gap-3 mb-3">
                        <GlyphSVG seed="tech-section" size={28} color="#22D3EE" />
                        <span className="chapter-label">
                            Capítulo 2
                        </span>
                    </motion.div>

                    <motion.h2 variants={staggerItem} className="title-xl mb-3" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3.2rem)' }}>
                        <span className="text-white">El Ecosistema del </span>
                        <span className="gradient-text">Testing Automatizado</span>
                    </motion.h2>

                    <motion.p variants={staggerItem} className="text-muted-light text-base max-w-3xl mx-auto leading-relaxed">
                        Antes de resolver el problema, entendamos el contexto: qué son las pruebas automatizadas, 
                        cómo funcionan las E2E, y por qué los localizadores son el eslabón más frágil de la cadena.
                    </motion.p>
                </motion.div>

                {/* Key Points Grid */}
                <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
                    {keyPoints.map((point, index) => (
                        <motion.div
                            key={point.icon}
                            {...fadeInUp}
                            transition={{ delay: index * 0.12 }}
                        >
                            <GlassCard className="p-5 h-full group hover:border-white/15 transition-all duration-500">
                                <div className="flex items-start gap-4">
                                    {/* Icon */}
                                    <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110"
                                        style={{
                                            background: `${point.color}10`,
                                            border: `1px solid ${point.color}25`,
                                        }}
                                    >
                                        <GlyphSVG seed={point.icon} size={24} color={point.color} />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h3
                                            className="font-display text-base font-semibold mb-1 transition-colors duration-300"
                                            style={{ color: point.color }}
                                        >
                                            {point.title}
                                        </h3>
                                        <p className="text-muted-light text-sm leading-relaxed">
                                            {point.description}
                                        </p>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                {/* Flow diagram visual */}
                <motion.div
                    {...fadeInUp}
                    transition={{ delay: 0.5 }}
                    className="mt-8 max-w-4xl mx-auto"
                >
                    <GlassCard className="p-6">
                        <h3 className="font-display text-base font-semibold text-white mb-4 text-center flex items-center justify-center gap-2">
                            <GlyphSVG seed="flow-diagram" size={24} color="#86EFAC" />
                            Flujo de un Test E2E
                        </h3>

                        {/* Flow Steps */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-2">
                            {[
                                { label: 'Interfaz', sublabel: 'Clic, input...', color: '#86EFAC' },
                                { label: 'Localizador', sublabel: '#id, .class, xpath', color: '#F59E0B' },
                                { label: 'Acción', sublabel: 'fill(), click()', color: '#22D3EE' },
                                { label: 'Validación', sublabel: 'expect()', color: '#A78BFA' },
                                { label: 'Resultado', sublabel: '✓ / ✗', color: '#86EFAC' },
                            ].map((step, i, arr) => (
                                <div key={step.label} className="flex items-center gap-2 sm:gap-2 w-full sm:w-auto">
                                    <div className="flex-1 sm:flex-initial text-center">
                                        <div
                                            className="w-full sm:w-28 py-2 px-3 rounded-xl border text-sm font-semibold transition-all duration-300"
                                            style={{
                                                borderColor: `${step.color}30`,
                                                background: `${step.color}08`,
                                                color: step.color,
                                            }}
                                        >
                                            {step.label}
                                        </div>
                                        <div className="text-[11px] text-muted mt-1.5">{step.sublabel}</div>
                                    </div>
                                    {i < arr.length - 1 && (
                                        <svg
                                            className="w-5 h-5 text-white/20 shrink-0 hidden sm:block"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Highlight the problem */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 }}
                            className="mt-4 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/15 text-center"
                        >
                            <p className="text-yellow-400 text-sm font-medium">
                                ⚠️ El <strong>localizador</strong> es el punto más frágil: si cambia el DOM, el test falla aunque la funcionalidad siga intacta.
                            </p>
                        </motion.div>
                    </GlassCard>
                </motion.div>
            </div>
        </section>
    );
};
