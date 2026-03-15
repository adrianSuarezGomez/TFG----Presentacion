import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';
import { GlyphSVG } from '../utils/glyphs';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/easing';

type HealingPhase = 'idle' | 'capture' | 'prompt' | 'llm' | 'validate' | 'persist' | 'done';

interface HealingResult {
    oldSelector: string;
    newSelector: string;
    reasoning: string;
    validated: boolean;
}

const healingResult: HealingResult = {
    oldSelector: '#username',
    newSelector: '[data-testid="username-input"]',
    reasoning: 'Selector data-testid es más estable y semántico.',
    validated: true,
};

const phaseLabels: Record<HealingPhase, string> = {
    idle: 'Esperando...',
    capture: 'Capturando DOM...',
    prompt: 'Construyendo prompt...',
    llm: 'LLM procesando...',
    validate: 'Validando selector...',
    persist: 'Persistiendo...',
    done: '¡Reparación exitosa!',
};

export const TheHealing = () => {
    const [phase, setPhase] = useState<HealingPhase>('idle');
    const [isHealing, setIsHealing] = useState(false);

    const runHealing = useCallback(async () => {
        if (isHealing) return;

        setIsHealing(true);
        const phases: HealingPhase[] = ['capture', 'prompt', 'llm', 'validate', 'persist', 'done'];

        for (const p of phases) {
            setPhase(p);
            await new Promise((r) => setTimeout(r, p === 'llm' ? 1200 : 600));
        }

        setIsHealing(false);
    }, [isHealing]);

    const reset = () => {
        setPhase('idle');
        setIsHealing(false);
    };

    return (
        <section id="the-healing" className="section relative py-16">
            <div className="absolute inset-0 bg-grid opacity-20" />

            <div className="relative z-10 w-full mx-auto">
                {/* Header */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: '-100px' }}
                    className="mb-8"
                >
                    <motion.div variants={staggerItem} className="flex items-center gap-3 mb-3">
                        <GlyphSVG seed="healing-section" size={28} color="#86EFAC" />
                        <span className="chapter-label">
                            Capítulo 4 — El WOW
                        </span>
                    </motion.div>

                    <motion.h2 variants={staggerItem} className="font-display text-4xl md:text-5xl font-bold mb-3">
                        <span className="text-white">La reparación </span>
                        <span className="gradient-text">automática</span>
                    </motion.h2>

                    <motion.p variants={staggerItem} className="subtitle max-w-2xl">
                        Cuando un locator falla, el sistema intenta repararlo usando un LLM local.
                    </motion.p>
                </motion.div>

                {/* Interactive Console */}
                <motion.div {...fadeInUp}>
                    <GlassCard variant="strong" className="p-5 md:p-8">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-accent/15">
                            <GlyphSVG seed="console" size={28} color="#86EFAC" />
                            <h3 className="font-display text-xl font-semibold text-white">
                                Consola de Reparación Interactiva
                            </h3>
                        </div>

                        {/* Three column layout */}
                        <div className="grid lg:grid-cols-3 gap-5 mb-6">
                            {/* Column 1: Broken selector */}
                            <div>
                                <h4 className="text-sm font-medium text-muted uppercase tracking-widest mb-2">
                                    Selector Inalcanzable
                                </h4>
                                <div className="bg-surface rounded-xl p-4 border border-white/5">
                                    <code className="text-red-400 font-mono text-lg">{healingResult.oldSelector}</code>
                                    <p className="text-xs text-muted mt-2">
                                        TimeoutError - locator no encontrado
                                    </p>
                                </div>
                            </div>

                            {/* Column 2: DOM snapshot */}
                            <div>
                                <h4 className="text-sm font-medium text-muted uppercase tracking-widest mb-2">
                                    Contexto DOM
                                </h4>
                                <div className="bg-surface rounded-xl p-4 font-mono text-sm overflow-auto max-h-32 border border-white/5">
                                    <div className="text-muted">&lt;form class="login-form"&gt;</div>
                                    <div className="pl-2">
                                        <span className="text-muted">&lt;input </span>
                                        <motion.span
                                            animate={{
                                                backgroundColor: phase === 'done' ? 'rgba(134, 239, 172, 0.15)' : 'transparent',
                                            }}
                                            className="px-1 rounded"
                                        >
                                            <span className="text-accent">data-testid="username-input"</span>
                                        </motion.span>
                                        <span className="text-muted"> /&gt;</span>
                                    </div>
                                    <div className="pl-2 text-muted">&lt;input data-testid="password-input" /&gt;</div>
                                    <div className="text-muted">&lt;/form&gt;</div>
                                </div>
                            </div>

                            {/* Column 3: Suggested selector */}
                            <div>
                                <h4 className="text-sm font-medium text-muted uppercase tracking-widest mb-2">
                                    Selector Sugerido
                                </h4>
                                <div className="bg-surface rounded-xl p-4 border border-white/5">
                                    <AnimatePresence mode="wait">
                                        {phase === 'done' ? (
                                            <motion.div
                                                key="result"
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                <code className="text-accent font-mono text-lg">
                                                    {healingResult.newSelector}
                                                </code>
                                                <p className="text-xs text-muted-light mt-1">{healingResult.reasoning}</p>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="waiting"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="text-muted text-sm"
                                            >
                                                {phase === 'idle' ? 'Ejecuta la reparación' : 'Procesando...'}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Phase indicator */}
                        <div className="mb-6">
                            <div className="flex items-center justify-center gap-2 mb-3">
                                {(['capture', 'prompt', 'llm', 'validate', 'persist'] as HealingPhase[]).map(
                                    (p, i) => {
                                        const isActive = phase === p;
                                        const isPast =
                                            ['capture', 'prompt', 'llm', 'validate', 'persist', 'done'].indexOf(phase) >
                                            i;

                                        return (
                                            <div key={p} className="flex items-center">
                                                <motion.div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${isPast
                                                        ? 'bg-accent/80 border-accent'
                                                        : isActive
                                                            ? 'border-accent bg-accent/15'
                                                            : 'border-muted-dark bg-surface'
                                                        }`}
                                                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                                                    transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
                                                >
                                                    <GlyphSVG
                                                        seed={`phase-${p}`}
                                                        size={18}
                                                        color={isPast || isActive ? '#fff' : '#52525B'}
                                                    />
                                                </motion.div>
                                                {i < 4 && (
                                                    <div
                                                        className={`w-12 h-0.5 transition-colors duration-300 ${isPast ? 'bg-accent' : 'bg-muted-dark'
                                                            }`}
                                                    />
                                                )}
                                            </div>
                                        );
                                    }
                                )}
                            </div>

                            <div className="text-center">
                                <motion.span
                                    key={phase}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={`text-base font-display font-medium ${phase === 'done' ? 'text-accent' : 'text-accent-light'
                                        }`}
                                >
                                    {phaseLabels[phase]}
                                </motion.span>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex justify-center gap-4">
                            <motion.button
                                onClick={runHealing}
                                disabled={isHealing}
                                className={`px-8 py-3 rounded-xl font-display font-medium text-lg transition-all duration-300 ${isHealing
                                    ? 'bg-muted-dark text-muted cursor-not-allowed'
                                    : 'bg-accent/90 hover:bg-accent text-surface shadow-glow-sm hover:shadow-glow-md'
                                    }`}
                                whileHover={!isHealing ? { scale: 1.02 } : {}}
                                whileTap={!isHealing ? { scale: 0.98 } : {}}
                            >
                                {isHealing ? 'Procesando...' : 'Iniciar Reparación'}
                            </motion.button>

                            {phase !== 'idle' && (
                                <motion.button
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    onClick={reset}
                                    className="px-6 py-3 rounded-xl font-display font-medium text-muted hover:text-white border border-muted-dark hover:border-muted transition-colors"
                                >
                                    Reiniciar
                                </motion.button>
                            )}
                        </div>

                        {/* Important note */}
                        <div className="mt-6 p-4 bg-accent/5 border border-accent/15 rounded-xl">
                            <p className="text-sm text-muted-light text-center">
                                <span className="text-accent font-medium">Importante:</span> El sistema valida el
                                selector antes de persistirlo. No oculta fallos funcionales reales.
                            </p>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </section>
    );
};
