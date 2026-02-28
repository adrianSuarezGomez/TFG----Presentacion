import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from './GlassCard';

interface GlossaryTerm {
    term: string;
    definition: string;
}

const glossaryTerms: GlossaryTerm[] = [
    {
        term: 'Self-Healing',
        definition: 'Capacidad del sistema para detectar y reparar automáticamente selectores rotos sin intervención manual.',
    },
    {
        term: 'Locator',
        definition: 'Selector que identifica un elemento en el DOM para las pruebas E2E (CSS, XPath, data-testid, etc.).',
    },
    {
        term: 'E2E (End-to-End)',
        definition: 'Pruebas que simulan el flujo completo de usuario a través de la aplicación.',
    },
    {
        term: 'Playwright',
        definition: 'Framework de automatización de pruebas de Microsoft para navegadores web modernos.',
    },
    {
        term: 'LLM (Large Language Model)',
        definition: 'Modelo de lenguaje de gran escala (ej: Llama, Mistral) usado para inferir selectores alternativos.',
    },
    {
        term: 'DOM',
        definition: 'Document Object Model: representación estructurada del HTML de una página web.',
    },
    {
        term: 'Flakiness',
        definition: 'Inestabilidad de tests que fallan intermitentemente sin cambios en el código.',
    },
    {
        term: 'Page Object Model (POM)',
        definition: 'Patrón de diseño que encapsula locators y acciones de una página en una clase reutilizable.',
    },
    {
        term: 'Fixture',
        definition: 'En Playwright, mecanismo de inyección de dependencias para compartir estado entre tests.',
    },
    {
        term: 'Selector Persistor',
        definition: 'Componente que guarda los selectores reparados para uso futuro.',
    },
    {
        term: 'Ollama',
        definition: 'Plataforma para ejecutar modelos LLM localmente sin enviar datos a la nube.',
    },
    {
        term: 'Strictness',
        definition: 'Nivel de agresividad del sistema de healing: conservative (seguro) vs aggressive (más reparaciones).',
    },
];

interface GlossaryProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Glossary = ({ isOpen, onClose }: GlossaryProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTerms = glossaryTerms.filter(
        (item) =>
            item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[80vh] overflow-hidden"
                    >
                        <GlassCard variant="strong" className="p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Glosario</h2>
                                <button
                                    onClick={onClose}
                                    className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                                    aria-label="Cerrar glosario"
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path
                                            d="M4 4L12 12M12 4L4 12"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Search */}
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Buscar término..."
                                    className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                                />
                            </div>

                            {/* Terms list */}
                            <div className="overflow-y-auto max-h-[50vh] space-y-3 pr-2">
                                {filteredTerms.map((item, index) => (
                                    <motion.div
                                        key={item.term}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        className="p-4 bg-surface rounded-lg"
                                    >
                                        <dt className="text-accent-light font-semibold text-lg mb-1">
                                            {item.term}
                                        </dt>
                                        <dd className="text-gray-300 text-sm leading-relaxed">
                                            {item.definition}
                                        </dd>
                                    </motion.div>
                                ))}

                                {filteredTerms.length === 0 && (
                                    <p className="text-gray-500 text-center py-8">
                                        No se encontraron términos.
                                    </p>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="mt-4 pt-4 border-t border-gray-700 text-center">
                                <span className="text-xs text-gray-500">
                                    {glossaryTerms.length} términos • Pulsa Esc para cerrar
                                </span>
                            </div>
                        </GlassCard>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
