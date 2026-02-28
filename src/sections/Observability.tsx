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
        <section id="observability" className="section relative">
            <div className="absolute inset-0 bg-grid opacity-20" />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: '-100px' }}
                    className="mb-12"
                >
                    <motion.div variants={staggerItem} className="flex items-center gap-3 mb-4">
                        <GlyphSVG seed="obs-section" size={32} color="#8B5CF6" />
                        <span className="text-sm text-accent uppercase tracking-wider font-medium">
                            Capítulo 6
                        </span>
                    </motion.div>

                    <motion.h2 variants={staggerItem} className="title-xl text-white mb-4">
                        Observabilidad y futuro
                    </motion.h2>

                    <motion.p variants={staggerItem} className="subtitle text-gray-400 max-w-2xl">
                        El sistema registra cada reparación para análisis y mejora continua.
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6 mb-8">
                    {/* Healing logs table */}
                    <div className="lg:col-span-2">
                        <GlassCard className="p-6 overflow-hidden">
                            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                                <GlyphSVG seed="logs-table" size={24} color="#A78BFA" />
                                Registro de Reparaciones
                            </h3>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-700 text-left">
                                            <th className="pb-3 text-gray-400 font-medium">Timestamp</th>
                                            <th className="pb-3 text-gray-400 font-medium">Test</th>
                                            <th className="pb-3 text-gray-400 font-medium">Selector Antiguo</th>
                                            <th className="pb-3 text-gray-400 font-medium">Selector Nuevo</th>
                                            <th className="pb-3 text-gray-400 font-medium text-center">Estado</th>
                                            <th className="pb-3 text-gray-400 font-medium text-right">Latencia</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayedLogs.map((log, i) => (
                                            <motion.tr
                                                key={log.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="border-b border-gray-800 hover:bg-surface-elevated/50"
                                            >
                                                <td className="py-3 text-gray-500 font-mono text-xs">
                                                    {log.timestamp.split(' ')[1]}
                                                </td>
                                                <td className="py-3 text-gray-300">{log.testName}</td>
                                                <td className="py-3">
                                                    <code className="text-red-400 text-xs bg-red-500/10 px-1 rounded">
                                                        {log.oldSelector}
                                                    </code>
                                                </td>
                                                <td className="py-3">
                                                    <code className="text-green-400 text-xs bg-green-500/10 px-1 rounded">
                                                        {log.newSelector.slice(0, 25)}...
                                                    </code>
                                                </td>
                                                <td className="py-3 text-center">
                                                    {log.success ? (
                                                        <span className="inline-flex items-center gap-1 text-green-400">
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
                                                <td className="py-3 text-right text-gray-400">
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
                                    className="mt-4 text-sm text-accent hover:text-accent-light transition-colors"
                                >
                                    {showAll ? 'Mostrar menos' : `Ver todos (${healingLogs.length})`}
                                </button>
                            )}
                        </GlassCard>
                    </div>

                    {/* Unstable locators ranking */}
                    <div className="lg:col-span-1">
                        <GlassCard className="p-6 h-full">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                                <GlyphSVG seed="ranking" size={24} color="#A78BFA" />
                                Locators Inestables
                            </h3>

                            <div className="space-y-3">
                                {unstableLocators.slice(0, 3).map((loc, i) => (
                                    <motion.div
                                        key={loc.selector}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-3 bg-surface rounded-lg"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-bold text-accent">#{i + 1}</span>
                                            <span className="text-xs text-gray-500">
                                                {loc.healed}/{loc.failures} reparados
                                            </span>
                                        </div>
                                        <code className="text-sm text-gray-300 block truncate">
                                            {loc.selector}
                                        </code>
                                        <div className="mt-2 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-accent to-green-400 rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(loc.healed / loc.failures) * 100}%` }}
                                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <ExpandableDetails title="¿Cómo se usa este ranking?" className="mt-4">
                                <p className="text-sm">
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
