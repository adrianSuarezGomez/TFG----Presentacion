import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { GlassCard, StatCard } from '../components/GlassCard';
import { GlyphSVG } from '../utils/glyphs';
import { config } from '../data/config';
import { staggerContainer, staggerItem } from '../utils/easing';

// SVG Bar Chart component
const BarChart = ({
    data,
    maxValue,
    height = 140,
}: {
    data: Array<{ label: string; value: number; color: string }>;
    maxValue: number;
    height?: number;
}) => {
    const barWidth = 80;
    const gap = 60;
    const totalWidth = data.length * (barWidth + gap);
    const topPadding = 35;
    const bottomPadding = 40;
    const svgHeight = height + topPadding + bottomPadding;
    const baselineY = height + topPadding;

    return (
        <svg viewBox={`0 0 ${totalWidth} ${svgHeight}`} className="w-full max-w-sm mx-auto">
            {/* Baseline */}
            <line
                x1="0"
                y1={baselineY}
                x2={totalWidth}
                y2={baselineY}
                stroke="#27272A"
                strokeWidth="1"
            />

            {/* Bars */}
            {data.map((item, i) => {
                const barHeight = (item.value / maxValue) * height;
                const x = i * (barWidth + gap) + gap / 2;
                const barY = baselineY - barHeight;

                return (
                    <g key={item.label}>
                        {/* Bar */}
                        <motion.rect
                            x={x}
                            y={barY}
                            width={barWidth}
                            height={barHeight}
                            fill={item.color}
                            rx="8"
                            initial={{ height: 0, y: baselineY }}
                            animate={{ height: barHeight, y: barY }}
                            transition={{ duration: 1, delay: i * 0.3, ease: [0.16, 1, 0.3, 1] }}
                        />

                        {/* Value label */}
                        <text
                            x={x + barWidth / 2}
                            y={barY - 8}
                            textAnchor="middle"
                            fill="#fff"
                            fontSize="18"
                            fontWeight="bold"
                            fontFamily="Outfit, system-ui, sans-serif"
                        >
                            {item.value}%
                        </text>

                        {/* X-axis label */}
                        <text
                            x={x + barWidth / 2}
                            y={baselineY + 25}
                            textAnchor="middle"
                            fill="#A1A1AA"
                            fontSize="13"
                            fontWeight="500"
                            fontFamily="Inter, system-ui, sans-serif"
                        >
                            {item.label}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

// ROI Dial component
const ROIDial = ({ percentage }: { percentage: number }) => {
    const radius = 55;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative w-36 h-36 mx-auto">
            <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
                {/* Background circle */}
                <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="none"
                    stroke="#18181B"
                    strokeWidth="10"
                />

                {/* Progress circle */}
                <motion.circle
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="none"
                    stroke="url(#roiGradient)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Gradient definition */}
                <defs>
                    <linearGradient id="roiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#86EFAC" />
                        <stop offset="100%" stopColor="#4ADE80" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                    className="font-display text-3xl font-bold text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {percentage}%
                </motion.span>
                <span className="text-xs text-muted">ROI Ahorro</span>
            </div>
        </div>
    );
};

// Stability Bar component
const StabilityBar = ({
    before,
    after,
}: {
    before: number;
    after: number;
}) => {
    return (
        <div className="space-y-3">
            <div>
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-light">Sin self-healing</span>
                    <span className="text-red-400">{Number(before.toFixed(1))}% estabilidad</span>
                </div>
                <div className="h-2 bg-surface rounded-full overflow-hidden border border-white/5">
                    <motion.div
                        className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${before}%` }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    />
                </div>
            </div>

            <div>
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-light">Con self-healing</span>
                    <span className="text-accent">{Number(after.toFixed(1))}% estabilidad</span>
                </div>
                <div className="h-2 bg-surface rounded-full overflow-hidden border border-white/5">
                    <motion.div
                        className="h-full bg-gradient-to-r from-accent-dark to-accent rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${after}%` }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                </div>
            </div>
        </div>
    );
};

export const Results = () => {
    const { results } = config;

    const chartData = useMemo(() => [
        { label: 'Sin healing', value: results.withoutHealing.failRate, color: '#EF4444' },
        { label: 'Con healing', value: results.withHealing.finalFailRate, color: '#86EFAC' },
    ], [results]);

    return (
        <section id="results" className="section relative py-12">
            <div className="absolute inset-0 bg-grid opacity-20" />

            <div className="relative z-10 w-full mx-auto">
                {/* Header */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: '-100px' }}
                    className="mb-6"
                >
                    <motion.div variants={staggerItem} className="flex items-center gap-3 mb-2">
                        <GlyphSVG seed="results-section" size={28} color="#86EFAC" />
                        <span className="chapter-label">
                            Capítulo 6
                        </span>
                    </motion.div>

                    <motion.h2 variants={staggerItem} className="font-display text-4xl md:text-5xl font-bold mb-2">
                        <span className="text-white">Resultados </span>
                        <span className="gradient-text">reales</span>
                    </motion.h2>

                    <motion.p variants={staggerItem} className="subtitle max-w-2xl">
                        Datos de experimento con {results.totalTests} tests bajo mutaciones de DOM controladas.
                    </motion.p>
                </motion.div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <StatCard
                        value={results.totalTests}
                        label="Tests totales"
                        className="text-center"
                    />
                    <StatCard
                        value={results.withHealing.recovered}
                        label="Tests recuperados"
                        trend="up"
                    />
                    <StatCard
                        value={`${results.withHealing.recoveryRate}%`}
                        label="Tasa de recuperación"
                        trend="up"
                    />
                </div>

                {/* Main comparison */}
                <div className="grid lg:grid-cols-2 gap-4">
                    {/* Bar chart comparison */}
                    <GlassCard className="p-4">
                        <h3 className="font-display text-lg font-semibold text-white mb-4 text-center">
                            Tasa de Fallo
                        </h3>
                        <BarChart data={chartData} maxValue={100} height={140} />
                        <p className="text-xs text-muted text-center mt-2">
                            Reducción del {(results.withoutHealing.failRate - results.withHealing.finalFailRate).toFixed(1)}% en fallos
                        </p>
                    </GlassCard>

                    {/* ROI and stability */}
                    <GlassCard className="p-4">
                        <h3 className="font-display text-lg font-semibold text-white mb-4 text-center">
                            Retorno de Inversión
                        </h3>
                        <ROIDial percentage={results.roiPercentage} />
                        <div className="mt-4">
                            <StabilityBar
                                before={Number((100 - results.withoutHealing.failRate).toFixed(1))}
                                after={Number((100 - results.withHealing.finalFailRate).toFixed(1))}
                            />
                        </div>
                    </GlassCard>
                </div>
            </div>
        </section>
    );
};
