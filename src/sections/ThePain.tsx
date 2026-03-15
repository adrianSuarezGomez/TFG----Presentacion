import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';
import { ExpandableDetails } from '../components/ExpandableDetails';
import { GlyphSVG } from '../utils/glyphs';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/easing';

// DOM snapshot simulation based on intensity
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

    // Simulation State for Self-Healing Button
    const [isHealing, setIsHealing] = useState(false);
    const [healingStep, setHealingStep] = useState(0);

    const triggerHealing = () => {
        setIsHealing(true);
        setHealingStep(1);
        setTimeout(() => setHealingStep(2), 1000);
        setTimeout(() => {
            setHealingStep(3);
            setTimeout(() => {
                setIsHealing(false);
                setHealingStep(4);
            }, 1000);
        }, 2200);
    };

    // Dynamic stats based on intensity
    const dynamicStats = useMemo(() => {
        if (intensity < 33) {
            return { failRate: 0, correctionTime: 0, failedTests: 0 };
        } else if (intensity < 66) {
            return { failRate: 35, correctionTime: 31 * 15, failedTests: 31 };
        } else {
            return { failRate: 91.8, correctionTime: 89 * 15, failedTests: 89 };
        }
    }, [intensity]);

    // Terminal output simulation
    const terminalOutput = useMemo(() => {
        if (!selectorFails) {
            return [
                { type: 'success', text: '✓ Locator #username found' },
                { type: 'success', text: '✓ Filling username...' },
                { type: 'success', text: '✓ Test passed' },
            ];
        }

        const output = [
            { type: 'info', text: '⟳ Running login.spec.ts...' },
            { type: 'error', text: '✗ Error: locator("#username") not found' },
            { type: 'error', text: '  Timeout 30000ms exceeded.' },
            { type: 'warn', text: '  Selector: #username' },
        ];

        if (healingStep > 0) {
            output.push({ type: 'warning', text: '🔌 Proxy interceptado: Iniciando Self-Healing...' });
        }
        if (healingStep > 1) {
            output.push({ type: 'info', text: '🧠 Analizando DOM alternativo con LLM Local...' });
        }
        if (healingStep > 2) {
            output.push({ type: 'success', text: `✨ Selector alternativo generado: ${domSnapshot.username}` });
            output.push({ type: 'info', text: '⟳ Reintentando acción...' });
        }
        if (healingStep > 3) {
            output.push({ type: 'success', text: '✓ Acción exitosa. Test recuperado.' });
        } else if (healingStep === 0) {
            output.push({ type: 'error', text: '✗ Test FAILED' });
        }

        return output;
    }, [selectorFails, healingStep, domSnapshot]);

    return (
        <section id="the-pain" className="section relative">
            {/* Background */}
            <div className="absolute inset-0 bg-grid opacity-25" />

            <div className="relative z-10 w-full mx-auto">
                {/* Header — compact */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: '-100px' }}
                    className="mb-4"
                >
                    <motion.div variants={staggerItem} className="flex items-center gap-3 mb-2">
                        <GlyphSVG seed="pain-section" size={28} color="#86EFAC" />
                        <span className="chapter-label">
                            Capítulo 3
                        </span>
                    </motion.div>

                    <motion.h2 variants={staggerItem} className="title-xl mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                        <span className="text-white">El problema real: </span>
                        <span className="gradient-text">Flakiness y Fragilidad</span>
                    </motion.h2>

                    <motion.p variants={staggerItem} className="text-muted-light text-base max-w-5xl leading-relaxed">
                        En aplicaciones web modernas (React, Angular), los identificadores cambian constantemente. Esto genera <strong className="text-white font-medium">"Flakiness"</strong>: tests que fallan sin cambios reales, causando falsos negativos y alto coste de mantenimiento.
                    </motion.p>
                </motion.div>

                {/* 2-column asymmetric layout for better readability */}
                <div className="grid lg:grid-cols-12 gap-6 items-start">
                    {/* Left Column (Text & Context) - 5 cols width */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Why Playwright + SUT */}
                        <motion.div {...fadeInUp}>
                            <GlassCard className="p-6">
                                <h3 className="font-display text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                    <GlyphSVG seed="why-pw" size={24} color="#86EFAC" />
                                    ¿Por qué Playwright?
                                </h3>
                                <p className="text-muted-light text-sm leading-relaxed mb-4">
                                    <strong className="text-white">Selenium</strong> depende de timeouts explícitos. <strong className="text-white">Cypress</strong> impone arquitectura cerrada. <strong className="text-white">Playwright</strong> ofrece <em>auto-wait</em>, ejecución fuera del proceso, y APIs robustas de accesibilidad para interceptación transparente.
                                </p>

                                <ExpandableDetails title="Definición del SUT" className="mt-2 text-sm">
                                    <ul className="space-y-2">
                                        <li>
                                            <span className="text-accent font-semibold">Nivel 1:</span>{' '}
                                            <span className="text-muted-light">DOM estable, sin modificaciones.</span>
                                        </li>
                                        <li>
                                            <span className="text-accent-light font-semibold">Nivel 2:</span>{' '}
                                            <span className="text-muted-light">Cambios menores, IDs.</span>
                                        </li>
                                        <li>
                                            <span className="text-red-400 font-semibold">Nivel 3:</span>{' '}
                                            <span className="text-muted-light">Mutaciones agresivas.</span>
                                        </li>
                                    </ul>
                                </ExpandableDetails>
                            </GlassCard>
                        </motion.div>

                        {/* Test Runner placed below SUT on left */}
                        <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
                            <GlassCard className="p-6">
                                <h3 className="font-display text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                    <GlyphSVG seed="terminal" size={24} color="#86EFAC" />
                                    Test Runner
                                </h3>

                                {/* Terminal */}
                                <div className="bg-surface rounded-xl p-4 font-mono text-xs overflow-auto border border-white/5 h-[160px]">
                                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                        <span className="text-muted-dark text-[11px] ml-2 font-semibold">npx playwright test</span>
                                    </div>

                                    <div className="space-y-1">
                                        {terminalOutput.map((line, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -5 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.08 }}
                                                className={`text-[12px] leading-relaxed ${line.type === 'success' ? 'text-accent' :
                                                    line.type === 'error' ? 'text-red-400' :
                                                        line.type === 'warn' ? 'text-yellow-400' :
                                                            'text-muted-light'
                                                    }`}
                                            >
                                                {line.text}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>

                    {/* Right Column (Interactive Simulator) - 7 cols width */}
                    <div className="lg:col-span-7">
                        <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="h-full">
                            <GlassCard className="p-6 h-full flex flex-col justify-between">
                                <div>
                                    <h3 className="font-display text-xl font-semibold text-white mb-4 flex items-center gap-3">
                                        <GlyphSVG seed="dom-drift" size={28} color="#86EFAC" />
                                        DOM Drift Simulator
                                    </h3>

                                    {/* Slider */}
                                    <div className="mb-6 bg-surface-elevated/30 p-5 rounded-2xl border border-white/5">
                                        <div className="flex justify-between text-xs text-muted mb-3 font-medium px-1">
                                            <span className="text-accent">Estable</span>
                                            <span className="text-yellow-400">Versionado</span>
                                            <span className="text-red-400">Caótico</span>
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
                                                background: `linear-gradient(to right, #86efac 0%, #eab308 50%, #ef4444 100%)`,
                                            }}
                                            aria-label="Intensidad de cambio UI"
                                        />
                                        <div className="flex items-center justify-center mt-4 gap-2">
                                            <span className="text-muted text-sm uppercase tracking-widest font-semibold">Intensidad</span>
                                            <span className="font-display text-2xl font-bold text-white bg-white/5 px-3 py-1 rounded-lg border border-white/10">{intensity}%</span>
                                        </div>
                                    </div>

                                    {/* DOM Preview */}
                                    <div className="bg-surface rounded-xl p-5 font-mono text-sm space-y-2 border border-white/5 mb-6">
                                        <div className="text-muted">&lt;form&gt;</div>
                                        <div className="pl-4">
                                            <span className="text-muted">&lt;input </span>
                                            <span className={selectorFails ? 'text-red-400 transition-colors' : 'text-accent transition-colors'}>
                                                {domSnapshot.username}
                                            </span>
                                            <span className="text-muted"> /&gt;</span>
                                        </div>
                                        <div className="pl-4">
                                            <span className="text-muted">&lt;input </span>
                                            <span className={selectorFails ? 'text-red-400 transition-colors' : 'text-accent transition-colors'}>
                                                {domSnapshot.password}
                                            </span>
                                            <span className="text-muted"> /&gt;</span>
                                        </div>
                                        <div className="pl-4">
                                            <span className="text-muted">&lt;button </span>
                                            <span className={selectorFails ? 'text-red-400 transition-colors' : 'text-accent transition-colors'}>
                                                {domSnapshot.submit}
                                            </span>
                                            <span className="text-muted">&gt;Login&lt;/button&gt;</span>
                                        </div>
                                        <div className="text-muted">&lt;/form&gt;</div>
                                    </div>
                                </div>

                                {/* Healing Button & Stats Area */}
                                <div className="min-h-[100px] flex flex-col justify-end">
                                    {selectorFails ? (
                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-accent/5 p-4 rounded-xl border border-accent/10">
                                            <motion.button
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                onClick={triggerHealing}
                                                disabled={isHealing || healingStep === 4}
                                                className={`px-5 py-3 rounded-xl font-display font-semibold text-sm flex items-center gap-2 transition-all duration-300 w-full sm:w-auto justify-center ${healingStep === 4
                                                    ? 'bg-accent/15 text-accent border border-accent/25 cursor-default'
                                                    : 'bg-accent/90 hover:bg-accent text-surface shadow-glow-sm hover:shadow-glow-md hover:scale-105'
                                                    }`}
                                            >
                                                {isHealing ? (
                                                    <>
                                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        LLM Local Pensando...
                                                    </>
                                                ) : healingStep === 4 ? (
                                                    <>✓ Test Recuperado</>
                                                ) : (
                                                    <>
                                                        <GlyphSVG seed="heal-action" size={18} color="currentColor" />
                                                        Ejecutar Self-Healing
                                                    </>
                                                )}
                                            </motion.button>

                                            <div className="flex items-center gap-6 text-center">
                                                <div>
                                                    <div className="font-display text-lg font-bold text-red-400">{dynamicStats.failRate}%</div>
                                                    <div className="text-[10px] text-muted uppercase tracking-wider">Fallo</div>
                                                </div>
                                                <div className="w-px h-8 bg-white/10" />
                                                <div>
                                                    <div className="font-display text-lg font-bold text-red-400">{dynamicStats.failedTests}</div>
                                                    <div className="text-[10px] text-muted uppercase tracking-wider">Fallidos</div>
                                                </div>
                                                <div className="w-px h-8 bg-white/10" />
                                                <div>
                                                    <div className="font-display text-lg font-bold text-yellow-400">~{dynamicStats.correctionTime}m</div>
                                                    <div className="text-[10px] text-muted uppercase tracking-wider">Pérdida</div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center p-4 bg-surface-elevated/20 rounded-xl border border-white/5 text-muted-light text-sm italic h-[86px]">
                                            Desliza el simulador hacia la derecha para probar la inestabilidad de locators.
                                        </div>
                                    )}
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
