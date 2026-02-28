import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import { ProgressRail } from './components/ProgressRail';
import { Glossary } from './components/Glossary';

// Sections
import { Hero } from './sections/Hero';
import { ThePain } from './sections/ThePain';
import { TheHealing } from './sections/TheHealing';
import { Architecture } from './sections/Architecture';
import { Results } from './sections/Results';
import { Observability } from './sections/Observability';
import { LiveDemo } from './sections/LiveDemo';
import { Questions } from './sections/Questions';
import { Thanks } from './sections/Thanks';

// Utils
import { useHotkeys, scrollToChapter, chapterSections } from './utils/useHotkeys';
import { config } from './data/config';

function App() {
    const [currentSection, setCurrentSection] = useState(0);
    const [chaosMode, setChaosMode] = useState(false);
    const [glossaryOpen, setGlossaryOpen] = useState(false);

    // Track current section based on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = chapterSections.map((id) => document.getElementById(id));
            const scrollY = window.scrollY + window.innerHeight / 3;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollY) {
                    setCurrentSection(i);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Navigate to section
    const navigateToSection = useCallback((index: number) => {
        scrollToChapter(index + 1);
    }, []);

    // Hotkeys
    useHotkeys([
        // Chapter jumps 1-9
        { key: '1', handler: () => scrollToChapter(1) },
        { key: '2', handler: () => scrollToChapter(2) },
        { key: '3', handler: () => scrollToChapter(3) },
        { key: '4', handler: () => scrollToChapter(4) },
        { key: '5', handler: () => scrollToChapter(5) },
        { key: '6', handler: () => scrollToChapter(6) },
        { key: '7', handler: () => scrollToChapter(7) },
        { key: '8', handler: () => scrollToChapter(8) },
        { key: '9', handler: () => scrollToChapter(9) },
        // Chaos mode easter egg
        { key: 'h', handler: () => setChaosMode((c) => !c) },
        // Escape to close overlays
        {
            key: 'Escape',
            handler: () => {
                setGlossaryOpen(false);
                setChaosMode(false);
            },
        },
        // Glossary
        { key: 'g', handler: () => setGlossaryOpen((g) => !g) },
    ]);

    // Chaos mode effects
    const chaosStyles = useMemo(() => {
        if (!chaosMode) return {};
        return {
            filter: 'hue-rotate(180deg)',
            transition: 'filter 0.5s ease',
        };
    }, [chaosMode]);

    return (
        <div className="min-h-screen bg-surface dark" style={chaosStyles}>
            {/* Progress Rail Navigation */}
            <ProgressRail
                currentSection={currentSection}
                onNavigate={navigateToSection}
            />

            {/* Glossary Modal */}
            <Glossary isOpen={glossaryOpen} onClose={() => setGlossaryOpen(false)} />

            {/* Chaos Mode Indicator */}
            <AnimatePresence>
                {chaosMode && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed bottom-4 right-4 z-50 glass px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-sm text-gray-300">Chaos Mode</span>
                        <span className="text-xs text-gray-500">(H para salir)</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Keyboard hints (shown briefly on load) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
                className="fixed bottom-4 left-4 z-40 hidden lg:block text-xs text-gray-600"
            >
                <span>1-9: Capítulos</span>
                <span className="mx-2">|</span>
                <span>G: Glosario</span>
            </motion.div>

            {/* Main content */}
            <main>
                <Hero />
                <ThePain />
                <TheHealing />
                <Architecture />
                <Results />
                <Observability />
                <LiveDemo />
                <Questions />
                <Thanks />
            </main>

            {/* Footer */}
            <footer className="py-8 text-center text-sm text-gray-600 border-t border-gray-800">
                <p>
                    {config.author} • {config.shortTitle} • TFG 2026
                </p>
            </footer>
        </div>
    );
}

export default App;

