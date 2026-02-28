import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExpandableDetailsProps {
    title?: string;
    children: ReactNode;
    defaultOpen?: boolean;
    className?: string;
}

export const ExpandableDetails = ({
    title = 'Detalles',
    children,
    defaultOpen = false,
    className = '',
}: ExpandableDetailsProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={`expandable-trigger ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 text-gray-400 hover:text-accent-light transition-colors group w-full"
                aria-expanded={isOpen}
            >
                {/* Chevron icon custom */}
                <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-current"
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <path
                        d="M6 4L10 8L6 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </motion.svg>

                <span className="text-sm font-medium group-hover:text-accent-light">
                    {title}
                </span>

                {/* Línea decorativa */}
                <div className="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 pl-7 text-gray-300 text-sm leading-relaxed">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Lista de detalles
interface DetailItem {
    label: string;
    value: string;
}

export const DetailsList = ({ items }: { items: DetailItem[] }) => {
    return (
        <dl className="space-y-2">
            {items.map((item, i) => (
                <div key={i} className="flex gap-2">
                    <dt className="text-gray-500 min-w-[100px]">{item.label}:</dt>
                    <dd className="text-gray-300">{item.value}</dd>
                </div>
            ))}
        </dl>
    );
};

// Código expandible
export const ExpandableCode = ({
    title = 'Ver código',
    code,
    language = 'typescript',
}: {
    title?: string;
    code: string;
    language?: string;
}) => {
    return (
        <ExpandableDetails title={title}>
            <pre className="bg-surface rounded-lg p-4 overflow-x-auto text-xs">
                <code className={`language-${language}`}>{code}</code>
            </pre>
        </ExpandableDetails>
    );
};
