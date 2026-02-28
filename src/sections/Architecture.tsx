import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';
import { ExpandableDetails } from '../components/ExpandableDetails';
import { GlyphSVG } from '../utils/glyphs';
import { architectureNodes, getConnections, ArchitectureNode } from '../data/architectureNodes';
import { staggerContainer, staggerItem } from '../utils/easing';

export const Architecture = () => {
    const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null);
    const [isFlowing, setIsFlowing] = useState(false);
    const [flowProgress, setFlowProgress] = useState(0);

    const connections = useMemo(() => getConnections(), []);

    const runFlow = useCallback(async () => {
        if (isFlowing) return;
        setIsFlowing(true);
        setFlowProgress(0);

        const steps = architectureNodes.length;
        for (let i = 0; i <= steps; i++) {
            setFlowProgress(i / steps);
            await new Promise((r) => setTimeout(r, 800));
        }

        setIsFlowing(false);
    }, [isFlowing]);

    return (
        <section id="architecture" className="section relative">
            <div className="absolute inset-0 bg-grid opacity-20" />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: '-100px' }}
                    className="mb-8"
                >
                    <motion.div variants={staggerItem} className="flex items-center gap-3 mb-4">
                        <GlyphSVG seed="arch-section" size={32} color="#8B5CF6" />
                        <span className="text-sm text-accent uppercase tracking-wider font-medium">
                            Capítulo 4
                        </span>
                    </motion.div>

                    <motion.h2 variants={staggerItem} className="title-xl text-white mb-4">
                        Arquitectura del sistema
                    </motion.h2>

                    <motion.p variants={staggerItem} className="subtitle text-gray-400 max-w-2xl">
                        Componentes modulares integrados en el flujo de Playwright.
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Diagram area */}
                    <div className="lg:col-span-2">
                        <GlassCard className="p-6 min-h-[500px] relative overflow-hidden">
                            {/* Run Flow button */}
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-white">Pipeline Interactivo</h3>
                                <motion.button
                                    onClick={runFlow}
                                    disabled={isFlowing}
                                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${isFlowing
                                            ? 'bg-gray-700 text-gray-400'
                                            : 'bg-accent hover:bg-accent-dark text-white'
                                        }`}
                                    whileHover={!isFlowing ? { scale: 1.02 } : {}}
                                >
                                    {isFlowing ? 'Ejecutando...' : 'Run Flow'}
                                </motion.button>
                            </div>

                            {/* Nodes grid */}
                            <div
                                className="relative w-full"
                                style={{ height: '400px' }}
                            >
                                {/* Connection lines */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                    {connections.map((conn, i) => {
                                        const from = architectureNodes.find((n) => n.id === conn.from);
                                        const to = architectureNodes.find((n) => n.id === conn.to);
                                        if (!from || !to) return null;

                                        const x1 = `${from.position.x}%`;
                                        const y1 = `${from.position.y}%`;
                                        const x2 = `${to.position.x}%`;
                                        const y2 = `${to.position.y}%`;

                                        const nodeIndex = architectureNodes.findIndex((n) => n.id === conn.from);
                                        const isActive = isFlowing && flowProgress > nodeIndex / architectureNodes.length;

                                        return (
                                            <motion.line
                                                key={`${conn.from}-${conn.to}`}
                                                x1={x1}
                                                y1={y1}
                                                x2={x2}
                                                y2={y2}
                                                stroke={isActive ? '#8B5CF6' : '#374151'}
                                                strokeWidth={isActive ? 2 : 1}
                                                strokeDasharray={isActive ? 'none' : '4 4'}
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                            />
                                        );
                                    })}
                                </svg>

                                {/* Nodes */}
                                {architectureNodes.map((node, index) => {
                                    const isSelected = selectedNode?.id === node.id;
                                    const isActive = isFlowing && flowProgress > index / architectureNodes.length;

                                    return (
                                        <motion.button
                                            key={node.id}
                                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-xl transition-all ${isSelected
                                                    ? 'bg-accent/30 border-2 border-accent glow-accent'
                                                    : isActive
                                                        ? 'bg-accent/20 border border-accent'
                                                        : 'bg-surface-elevated border border-gray-700 hover:border-accent/50'
                                                }`}
                                            style={{
                                                left: `${node.position.x}%`,
                                                top: `${node.position.y}%`,
                                            }}
                                            onClick={() => setSelectedNode(isSelected ? null : node)}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{
                                                opacity: 1,
                                                scale: isActive ? 1.1 : 1,
                                            }}
                                            transition={{ delay: index * 0.05 }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <GlyphSVG
                                                seed={`node-${node.id}`}
                                                size={32}
                                                color={isSelected || isActive ? '#A78BFA' : '#6B7280'}
                                            />
                                            <div className="mt-1 text-xs font-medium text-center whitespace-nowrap max-w-[80px] truncate">
                                                {node.label.split('/')[0]}
                                            </div>
                                        </motion.button>
                                    );
                                })}

                                {/* Flow particles */}
                                {isFlowing && (
                                    <motion.div
                                        className="absolute w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/50"
                                        animate={{
                                            left: architectureNodes.map((n) => `${n.position.x}%`),
                                            top: architectureNodes.map((n) => `${n.position.y}%`),
                                        }}
                                        transition={{
                                            duration: architectureNodes.length * 0.8,
                                            ease: 'linear',
                                        }}
                                    />
                                )}
                            </div>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                Haz clic en un nodo para ver detalles
                            </p>
                        </GlassCard>
                    </div>

                    {/* Details panel */}
                    <div className="lg:col-span-1">
                        <GlassCard className="p-6 h-full">
                            <h3 className="text-lg font-semibold text-white mb-4">Detalles del Componente</h3>

                            <AnimatePresence mode="wait">
                                {selectedNode ? (
                                    <motion.div
                                        key={selectedNode.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <GlyphSVG
                                                seed={`node-${selectedNode.id}`}
                                                size={40}
                                                color="#A78BFA"
                                            />
                                            <div>
                                                <h4 className="font-semibold text-accent-light">
                                                    {selectedNode.label}
                                                </h4>
                                            </div>
                                        </div>

                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            {selectedNode.description}
                                        </p>

                                        <ExpandableDetails title="Más detalles" defaultOpen>
                                            <ul className="space-y-2">
                                                {selectedNode.details.map((detail, i) => (
                                                    <li key={i} className="text-sm text-gray-400 flex gap-2">
                                                        <span className="text-accent">•</span>
                                                        {detail}
                                                    </li>
                                                ))}
                                            </ul>
                                        </ExpandableDetails>

                                        {selectedNode.connections.length > 0 && (
                                            <div className="pt-4 border-t border-gray-700">
                                                <p className="text-xs text-gray-500 mb-2">Conecta con:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedNode.connections.map((connId) => {
                                                        const target = architectureNodes.find((n) => n.id === connId);
                                                        return (
                                                            <button
                                                                key={connId}
                                                                onClick={() => {
                                                                    const targetNode = architectureNodes.find((n) => n.id === connId);
                                                                    if (targetNode) setSelectedNode(targetNode);
                                                                }}
                                                                className="px-2 py-1 bg-surface rounded text-xs text-gray-400 hover:text-accent transition-colors"
                                                            >
                                                                {target?.label.split('/')[0]}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-gray-500 text-sm"
                                    >
                                        <p className="mb-4">
                                            Selecciona un nodo del diagrama para ver su descripción y detalles técnicos.
                                        </p>
                                        <p className="text-xs">
                                            También puedes ejecutar "Run Flow" para ver cómo fluyen los datos a través
                                            del pipeline.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </section>
    );
};
