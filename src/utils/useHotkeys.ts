import { useEffect, useCallback, useRef } from 'react';

type KeyHandler = (event: KeyboardEvent) => void;

interface HotkeyConfig {
    key: string;
    handler: KeyHandler;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    preventDefault?: boolean;
}

export const useHotkeys = (hotkeys: HotkeyConfig[]) => {
    const handlersRef = useRef(hotkeys);
    handlersRef.current = hotkeys;

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        // No activar si estamos en un input
        const target = event.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
            return;
        }

        for (const config of handlersRef.current) {
            const keyMatch = event.key.toLowerCase() === config.key.toLowerCase();
            const ctrlMatch = config.ctrl ? event.ctrlKey : !event.ctrlKey;
            const shiftMatch = config.shift ? event.shiftKey : !event.shiftKey;
            const altMatch = config.alt ? event.altKey : !event.altKey;

            if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
                if (config.preventDefault !== false) {
                    event.preventDefault();
                }
                config.handler(event);
                return;
            }
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
};

// Hook simple para una sola tecla
export const useHotkey = (key: string, handler: KeyHandler, options?: Omit<HotkeyConfig, 'key' | 'handler'>) => {
    useHotkeys([{ key, handler, ...options }]);
};

// Utilidad para scroll a sección
export const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

// Mapeo de capítulo ID a sección
export const chapterSections = [
    'hero',
    'the-pain',
    'the-healing',
    'architecture',
    'results',
    'observability',
    'live-demo',
    'questions',
    'thanks',
] as const;

export const scrollToChapter = (chapterNumber: number) => {
    if (chapterNumber >= 1 && chapterNumber <= 9) {
        scrollToSection(chapterSections[chapterNumber - 1]);
    }
};
