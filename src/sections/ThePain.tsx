import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';
import { ExpandableDetails } from '../components/ExpandableDetails';
import { GlyphSVG } from '../utils/glyphs';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/easing';

// Simulación de DOM que cambia según intensidad
const generateDOMSnapshot = (intensity: number) => {
    const stable = {
        username: 'id="username"',
        password: 'id="password"',
        submit: 'id="submit-btn"',
        nav: 'class="nav-menu"',
    };

    const versioned = {
        username: 'id="username_v2"',
        password: 'id="password-field-v2"',
        submit: 'id="submit-button-v2"',
        nav: 'class="nav-menu-redesign"',
    };

    const chaotic = {
        username: 'data-el-id="el-a7x9-username"',
        password: 'data-el-id="el-b3k2-pwd"',
        submit: 'class="btn btn-primary sc-a7x92bc"',
        nav: 'class="sc-nav-12ab34cd"',
    };

    if (intensity < 33) return stable;
    if (intensity < 66) return versioned;
    return chaotic;
};

export const ThePain = () => {
    const [intensity, setIntensity] = useState(0);

    const domSnapshot = useMemo(() => generateDOMSnapshot(intensity), [intensity]);
    const selectorFails = intensity > 30;

    // Estadísticas dinámicas según intensidad
    const dynamicStats = useMemo(() => {
        if (intensity < 33) {
            return { failRate: 0, correctionTime: 0, failedTests: 0 };
        } else if (intensity < 66) {
            return { failRate: 25.0, correctionTime: 90, failedTests: 6 };
        } else {
            return { failRate: 45.8, correctionTime: 165, failedTests: 11 };
        }
    }, [intensity]);

    // Simular terminal cuando falla
    const terminalOutput = useMemo(() => {
        if (!selectorFails) {
            return [
                { type: 'success', text: '✓ Locator #username found' },
                { type: 'success', text: '✓ Filling username...' },
                { type: 'success', text: '✓ Test passed' },
            ];
        }
        return [
            { type: 'info', text: '⟳ Running login.spec.ts...' },
            { type: 'error', text: '✗ Error: locator("#username") not found' },
            { type: 'error', text: '  Timeout 30000ms exceeded.' },
            { type: 'warn', text: '  Selector: #username' },
            { type: 'error', text: '✗ Test FAILED' },
        ];
    }, [selectorFails]);

    return (
        <section id="the-pain" className="section relative">
            {/* Background grid */}
            <div className="absolute inset-0 bg-grid opacity-30" />

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
                        <GlyphSVG seed="pain-section" size={32} color="#8B5CF6" />
                        <span className="text-sm text-accent uppercase tracking-wider font-medium">
                            Capítulo 2
                        </span>
                    </motion.div>

                    <motion.h2 variants={staggerItem} className="title-xl text-white mb-4">
                        El dolor real
                    </motion.h2>

                    <motion.p variants={staggerItem} className="subtitle text-gray-400 max-w-2xl">
                        Tests que rompen por cambios mínimos en la UI. Falsos negativos, pipelines en rojo, tiempo perdido.
                    </motion.p>
                </motion.div>

                {/* Interactive area */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* DOM Drift Simulator */}
                    <motion.div {...fadeInUp}>
                        <GlassCard className="p-6">
                            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                                <GlyphSVG seed="dom-drift" size={24} color="#A78BFA" />
                                DOM Drift Simulator
                            </h3>

                            {/* Slider */}
                            <div className="mb-6">
                                <div className="flex justify-between text-sm text-gray-400 mb-2">
                                    <span>Sin cambios</span>
                                    <span>Pequeños cambios</span>
                                    <span>Selectores dinámicos</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={intensity}
                                    onChange={(e) => {
                                        setIntensity(Number(e.target.value));
                                    }}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                                    style={{
                                        background: `linear-gradient(to right, #22c55e 0%, #eab308 50%, #ef4444 100%)`,
                                    }}
                                    aria-label="Intensidad de cambio UI"
                                />
                                <div className="text-center mt-2">
                                    <span className="text-2xl font-bold text-accent">{intensity}%</span>
                                    <span className="text-gray-500 ml-2">intensidad</span>
                                </div>
                            </div>

                            {/* DOM Preview */}
                            <div className="bg-surface rounded-lg p-4 font-mono text-sm space-y-2 overflow-x-auto">
                                <div className="text-gray-500">&lt;form&gt;</div>
                                <div className="pl-4">
                                    <span className="text-gray-500">&lt;input </span>
                                    <span className={selectorFails ? 'text-red-400' : 'text-green-400'}>
                                        {domSnapshot.username}
                                    </span>
                                    <span className="text-gray-500"> /&gt;</span>
                                </div>
                                <div className="pl-4">
                                    <span className="text-gray-500">&lt;input </span>
                                    <span className={selectorFails ? 'text-red-400' : 'text-green-400'}>
                                        {domSnapshot.password}
                                    </span>
                                    <span className="text-gray-500"> /&gt;</span>
                                </div>
                                <div className="pl-4">
                                    <span className="text-gray-500">&lt;button </span>
                                    <span className={selectorFails ? 'text-red-400' : 'text-green-400'}>
                                        {domSnapshot.submit}
                                    </span>
                                    <span className="text-gray-500">&gt;Login&lt;/button&gt;</span>
                                </div>
                                <div className="text-gray-500">&lt;/form&gt;</div>
                            </div>

                            {/* Expandable details */}
                            <div className="mt-4">
                                <ExpandableDetails title="¿Por qué cambia el DOM?">
                                    <ul className="space-y-2 text-sm">
                                        <li>• <strong>Refactoring de componentes:</strong> cambios de IDs, clases</li>
                                        <li>• <strong>CSS-in-JS:</strong> clases generadas dinámicamente</li>
                                        <li>• <strong>Versionado de UI:</strong> migraciones incrementales</li>
                                        <li>• <strong>A/B Testing:</strong> variantes con diferentes estructuras</li>
                                    </ul>
                                </ExpandableDetails>
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Terminal Output */}
                    <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                        <GlassCard className="p-6 h-full flex flex-col">
                            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                                <GlyphSVG seed="terminal" size={24} color="#A78BFA" />
                                Test Runner
                            </h3>

                            {/* Terminal */}
                            <div className="flex-1 bg-[#0d0d0d] rounded-lg p-4 font-mono text-sm overflow-auto">
                                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-800">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="text-gray-600 text-xs ml-2">npx playwright test</span>
                                </div>

                                <div className="space-y-1">
                                    {terminalOutput.map((line, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className={`${line.type === 'success' ? 'text-green-400' :
                                                line.type === 'error' ? 'text-red-400' :
                                                    line.type === 'warn' ? 'text-yellow-400' :
                                                        'text-gray-400'
                                                }`}
                                        >
                                            {line.text}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Stats */}
                            {selectorFails && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 grid grid-cols-3 gap-4 text-center"
                                >
                                    <div className="p-3 bg-red-500/10 rounded-lg">
                                        <div className="text-2xl font-bold text-red-400">{dynamicStats.failRate}%</div>
                                        <div className="text-xs text-gray-500">Tasa de fallo</div>
                                    </div>
                                    <div className="p-3 bg-yellow-500/10 rounded-lg">
                                        <div className="text-2xl font-bold text-yellow-400">~{dynamicStats.correctionTime}</div>
                                        <div className="text-xs text-gray-500">Min. corrección</div>
                                    </div>
                                    <div className="p-3 bg-red-500/10 rounded-lg">
                                        <div className="text-2xl font-bold text-red-400">{dynamicStats.failedTests}</div>
                                        <div className="text-xs text-gray-500">Tests fallidos</div>
                                    </div>
                                </motion.div>
                            )}
                        </GlassCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
