// Configuración centralizada - Parametrizable
export const config = {
    // Datos del autor
    author: "Adrián Suárez Gómez",
    tutor: "Nombre del Tutor", // Cambiar por el nombre real
    title: "Self-Healing de locators en E2E con Playwright + IA local",
    shortTitle: "Self-Healing E2E",
    context: "Defensa TFG",

    // Colores (violeta neón por defecto)
    accent: {
        primary: "#8B5CF6",
        light: "#A78BFA",
        dark: "#7C3AED",
        glow: "rgba(139, 92, 246, 0.4)",
    },

    // Datos de resultados EXACTOS
    results: {
        totalTests: 24,
        withoutHealing: {
            failed: 11,
            failRate: 45.8,
            correctionTime: 165, // minutos
        },
        withHealing: {
            recovered: 9,
            finalFailed: 2,
            recoveryRate: 81.8,
            finalFailRate: 8.3,
            correctionTime: 30, // minutos
        },
        timeSaved: 135, // minutos
        roiPercentage: 82, // ahorro estimado
    },

    // Shortcuts
    shortcuts: {
        chapters: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        glossary: "G",
        chaos: "H",
        exit: "Escape",
    },
} as const;

// Tipo para TypeScript
export type AppConfig = typeof config;

