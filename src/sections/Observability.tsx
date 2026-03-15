import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';
import { ExpandableDetails } from '../components/ExpandableDetails';
import { GlyphSVG } from '../utils/glyphs';
import { healingLogs, unstableLocators } from '../data/healingLogs';
import { staggerContainer, staggerItem } from '../utils/easing';

export const Observability = () => {
    const [showAll, setShowAll] = useState(false);

    const displayedLogs = showAll ? healingLogs : healingLogs.slice(0, 5);

    return (
        <section id="observability" className="section relative py-8">
            <div className="absolute inset-0 bg-grid opacity-20" />

            <div className="relative z-10 w-full mx-auto">
                {/* Header */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: '-100px' }}
                    className="mb-4"
                >
                    <motion.div variants={staggerItem} className="flex items-center gap-3 mb-2">
                        <GlyphSVG seed="obs-section" size={32} color="#86EFAC" />
                        <span className="chapter-label">
                            Capítulo 7
                        </span>
                    </motion.div>

                    <motion.h2 variants={staggerItem} className="title-xl mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                        <span className="text-white">Observabilidad </span>
                        <span className="gradient-text">y futuro</span>
                    </motion.h2>

                    <motion.p variants={staggerItem} className="text-muted-light text-sm max-w-2xl">
                        El sistema registra cada reparación para análisis y mejora continua.
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-4 mb-4">
                    {/* Operational Impact */}
                    <div className="lg:col-span-3">
                        <GlassCard className="p-4 overflow-hidden bg-accent/3 border-accent/15">
                            <h3 className="font-display text-base font-semibold text-white mb-1 flex items-center gap-2">
                                <GlyphSVG seed="impacto-op" size={24} color="#86EFAC" />
                                Impacto Operativo Total
                            </h3>
                            <div className="flex flex-col md:flex-row gap-6 md:items-center">
                                <div className="text-xs text-muted-light max-w-2xl leading-relaxed">
                                    Basado en métricas de la industria, el diagnóstico y reparación manual de un locador E2E lleva una media de <strong className="text-white">15 minutos</strong>. Extrapolando esta métrica técnica sobre la efectividad obtenida (89 tests recuperados exitosamente con 100% de eficacia)...
                                </div>
                                <div className="flex-1 flex gap-4 text-center justify-end">
                                    <div className="bg-surface/50 p-4 rounded-xl border border-white/5 flex-1 max-w-[180px]">
                                        <div className="font-display text-3xl font-bold text-accent">89</div>
                                        <div className="text-xs text-muted uppercase mt-1 tracking-widest">Tests recuperados</div>
                                    </div>
                                    <div className="bg-accent/8 p-4 rounded-xl border border-accent/15 flex-1 max-w-[180px]">
                                        <div className="font-display text-3xl font-bold text-accent-light">1.335</div>
                                        <div className="text-xs text-muted uppercase mt-1 tracking-widest">Minutos ahorrados</div>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Healing logs table */}
                    <div className="lg:col-span-2">
                        <GlassCard className="p-4 overflow-hidden">
                            <h3 className="font-display text-base font-semibold text-white mb-2 flex items-center gap-2">
                                <GlyphSVG seed="logs-table" size={24} color="#86EFAC" />
                                Registro de Reparaciones
                            </h3>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-white/5 text-left">
                                            <th className="pb-3 text-muted font-medium">Timestamp</th>
                                            <th className="pb-3 text-muted font-medium">Test</th>
                                            <th className="pb-3 text-muted font-medium">Selector Antiguo</th>
                                            <th className="pb-3 text-muted font-medium">Selector Nuevo</th>
                                            <th className="pb-3 text-muted font-medium text-center">Estado</th>
                                            <th className="pb-3 text-muted font-medium text-right">Latencia</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayedLogs.map((log, i) => (
                                            <motion.tr
                                                key={log.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="border-b border-white/3 hover:bg-surface-elevated/50"
                                            >
                                                <td className="py-3 text-muted font-mono text-xs">
                                                    {log.timestamp.split(' ')[1]}
                                                </td>
                                                <td className="py-3 text-muted-light">{log.testName}</td>
                                                <td className="py-3">
                                                    <code className="text-red-400 text-xs bg-red-500/8 px-1.5 py-0.5 rounded-md">
                                                        {log.oldSelector}
                                                    </code>
                                                </td>
                                                <td className="py-3">
                                                    <code className="text-accent text-xs bg-accent/8 px-1.5 py-0.5 rounded-md">
                                                        {log.newSelector.slice(0, 25)}...
                                                    </code>
                                                </td>
                                                <td className="py-3 text-center">
                                                    {log.success ? (
                                                        <span className="inline-flex items-center gap-1 text-accent">
                                                            <svg
                                                                width="14"
                                                                height="14"
                                                                viewBox="0 0 14 14"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    d="M3 7L6 10L11 4"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                            OK
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 text-red-400">
                                                            <svg
                                                                width="14"
                                                                height="14"
                                                                viewBox="0 0 14 14"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    d="M4 4L10 10M10 4L4 10"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                />
                                                            </svg>
                                                            FAIL
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-3 text-right text-muted-light">
                                                    {log.latencyMs}ms
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {healingLogs.length > 5 && (
                                <button
                                    onClick={() => setShowAll(!showAll)}
                                    className="mt-4 text-sm text-accent hover:text-accent-light transition-colors font-medium"
                                >
                                    {showAll ? 'Mostrar menos' : `Ver todos (${healingLogs.length})`}
                                </button>
                            )}
                        </GlassCard>
                    </div>

                    {/* Unstable locators ranking */}
                    <div className="lg:col-span-1">
                        <GlassCard className="p-4 h-full">
                            <h3 className="font-display text-base font-semibold text-white mb-2 flex items-center gap-2">
                                <GlyphSVG seed="ranking" size={20} color="#86EFAC" />
                                Locators Inestables
                            </h3>

                            <div className="space-y-2">
                                {unstableLocators.slice(0, 3).map((loc, i) => (
                                    <motion.div
                                        key={loc.selector}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-2 bg-surface rounded-lg border border-white/5"
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs font-bold text-accent font-display">#{i + 1}</span>
                                            <span className="text-[10px] text-muted">
                                                {loc.healed}/{loc.failures} reparados
                                            </span>
                                        </div>
                                        <code className="text-xs text-muted-light block truncate">
                                            {loc.selector}
                                        </code>
                                        <div className="mt-1 h-1 bg-surface-elevated rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-accent-dark to-accent rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(loc.healed / loc.failures) * 100}%` }}
                                                transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <ExpandableDetails title="¿Cómo se usa este ranking?" className="mt-2">
                                <p className="text-xs">
                                    Los locators más inestables son candidatos a refactorizar manualmente con
                                    selectores más robustos (data-testid, aria-label).
                                </p>
                            </ExpandableDetails>
                        </GlassCard>
                    </div>
                </div>


                {/* Print summary (hidden, shown only in print) */}
                <div className="print-summary hidden">
                    <h1>Self-Healing E2E con Playwright + IA Local</h1>
                    <p>Autor: Adrián Suárez Gómez</p>
                    <h2>Resultados Clave</h2>
                    <ul>
                        <li>Tasa de recuperación: 81.8%</li>
                        <li>Reducción de tiempo: 135 minutos</li>
                        <li>Tests recuperados: 9 de 11</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};
