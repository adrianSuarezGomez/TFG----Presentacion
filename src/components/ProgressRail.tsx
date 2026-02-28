import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chapters } from '../data/chapters';
import { GlyphSVG } from '../utils/glyphs';

interface ProgressRailProps {
    currentSection: number;
    onNavigate: (index: number) => void;
}

export const ProgressRail = ({ currentSection, onNavigate }: ProgressRailProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    // Ocultar al hacer scroll rápido
    useEffect(() => {
        let scrollTimeout: number;
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const isScrollingFast = Math.abs(currentScrollY - lastScrollY) > 50;

            if (isScrollingFast) {
                setIsVisible(false);
                clearTimeout(scrollTimeout);
                scrollTimeout = window.setTimeout(() => setIsVisible(true), 300);
            } else {
                setIsVisible(true);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);

    return (
        <motion.nav
            className="progress-rail fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isVisible ? 1 : 0.3, x: 0 }}
            transition={{ duration: 0.3 }}
            aria-label="Navegación de capítulos"
        >
            {chapters.map((chapter, index) => {
                const isActive = currentSection === index;
                const isHovered = hoveredIndex === index;

                return (
                    <div key={chapter.id} className="relative flex items-center">
                        {/* Línea conectora */}
                        {index < chapters.length - 1 && (
                            <div
                                className={`absolute top-full left-1/2 -translate-x-1/2 w-px h-2 transition-colors duration-300 ${currentSection > index ? 'bg-accent' : 'bg-gray-700'
                                    }`}
                            />
                        )}

                        {/* Botón del capítulo */}
                        <button
                            onClick={() => onNavigate(index)}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isActive
                                    ? 'bg-accent/20 border-2 border-accent'
                                    : 'bg-surface-elevated border border-gray-700 hover:border-accent/50'
                                }`}
                            aria-label={`Capítulo ${chapter.id}: ${chapter.title}`}
                            aria-current={isActive ? 'true' : 'false'}
                        >
                            {/* Glyph interno */}
                            <GlyphSVG
                                seed={`chapter-${chapter.id}`}
                                size={20}
                                color={isActive ? '#A78BFA' : '#6B7280'}
                                className="transition-opacity duration-300"
                            />

                            {/* Número de capítulo (shortcut) */}
                            <span
                                className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center transition-colors ${isActive ? 'bg-accent text-white' : 'bg-gray-700 text-gray-400'
                                    }`}
                            >
                                {chapter.id}
                            </span>
                        </button>

                        {/* Tooltip con título */}
                        <AnimatePresence>
                            {isHovered && (
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-14 whitespace-nowrap"
                                >
                                    <div className="glass-strong px-3 py-2 rounded-lg text-sm">
                                        <span className="text-accent font-medium">{chapter.id}.</span>{' '}
                                        <span className="text-gray-200">{chapter.title.slice(0, 30)}</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </motion.nav>
    );
};
