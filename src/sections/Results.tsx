import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { GlassCard, StatCard } from '../components/GlassCard';
import { GlyphSVG } from '../utils/glyphs';
import { config } from '../data/config';
import { staggerContainer, staggerItem } from '../utils/easing';

// SVG Bar Chart component - más compacto
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
                stroke="#374151"
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
                            rx="6"
                            initial={{ height: 0, y: baselineY }}
                            animate={{ height: barHeight, y: barY }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                        />

                        {/* Value label - above bar */}
                        <text
                            x={x + barWidth / 2}
                            y={barY - 8}
                            textAnchor="middle"
                            fill="#fff"
                            fontSize="18"
                            fontWeight="bold"
                        >
                            {item.value}%
                        </text>

                        {/* X-axis label - below baseline */}
                        <text
                            x={x + barWidth / 2}
                            y={baselineY + 25}
                            textAnchor="middle"
                            fill="#fff"
                            fontSize="13"
                            fontWeight="600"
                        >
                            {item.label}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

// ROI Dial component - más compacto
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
                    stroke="#1F2937"
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
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                />

                {/* Gradient definition */}
                <defs>
                    <linearGradient id="roiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#22C55E" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                    className="text-3xl font-bold text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {percentage}%
                </motion.span>
                <span className="text-xs text-gray-400">ROI Ahorro</span>
            </div>
        </div>
    );
};

// Stability Bar component - más compacto
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
                    <span className="text-gray-400">Sin self-healing</span>
                    <span className="text-red-400">{before}% estabilidad</span>
                </div>
                <div className="h-2 bg-surface rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${before}%` }}
                        transition={{ duration: 1 }}
                    />
                </div>
            </div>

            <div>
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Con self-healing</span>
                    <span className="text-green-400">{after}% estabilidad</span>
                </div>
                <div className="h-2 bg-surface rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-accent to-green-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${after}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
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
        { label: 'Con healing', value: results.withHealing.finalFailRate, color: '#22C55E' },
    ], [results]);

    return (
        <section id="results" className="section relative py-12">
            <div className="absolute inset-0 bg-grid opacity-20" />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header - más compacto */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: '-100px' }}
                    className="mb-6"
                >
                    <motion.div variants={staggerItem} className="flex items-center gap-3 mb-2">
                        <GlyphSVG seed="results-section" size={28} color="#8B5CF6" />
                        <span className="text-sm text-accent uppercase tracking-wider font-medium">
                            Capítulo 5
                        </span>
                    </motion.div>

                    <motion.h2 variants={staggerItem} className="text-4xl md:text-5xl font-bold text-white mb-2">
                        Resultados reales
                    </motion.h2>

                    <motion.p variants={staggerItem} className="text-lg text-gray-400 max-w-2xl">
                        Datos de experimento con {results.totalTests} tests bajo mutaciones de DOM controladas.
                    </motion.p>
                </motion.div>

                {/* Stats grid - más compacto */}
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

                {/* Main comparison - más compacto */}
                <div className="grid lg:grid-cols-2 gap-4">
                    {/* Bar chart comparison */}
                    <GlassCard className="p-4">
                        <h3 className="text-lg font-semibold text-white mb-4 text-center">
                            Tasa de Fallo
                        </h3>
                        <BarChart data={chartData} maxValue={50} height={140} />
                        <p className="text-xs text-gray-500 text-center mt-2">
                            Reducción del {(results.withoutHealing.failRate - results.withHealing.finalFailRate).toFixed(1)}% en fallos
                        </p>
                    </GlassCard>

                    {/* ROI and stability */}
                    <GlassCard className="p-4">
                        <h3 className="text-lg font-semibold text-white mb-4 text-center">
                            Retorno de Inversión
                        </h3>
                        <ROIDial percentage={results.roiPercentage} />
                        <div className="mt-4">
                            <StabilityBar
                                before={100 - results.withoutHealing.failRate}
                                after={100 - results.withHealing.finalFailRate}
                            />
                        </div>
                    </GlassCard>
                </div>
            </div>
        </section>
    );
};
