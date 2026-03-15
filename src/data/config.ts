// Configuración centralizada - Parametrizable
export const config = {
    // Datos del autor
    author: "Adrián Suárez Gómez",
    tutor: "Román Armijo Bidón", // Cambiar por el nombre real
    title: "Auto-Reparación (Self-Healing) de locators en pruebas E2E",
    shortTitle: "Self-Healing E2E",
    context: "Defensa TFG",

    // Colores (Estética Cyber-Dashboard: Verde Neón por éxito/principal)
    accent: {
        primary: "#22C55E", // Tailwind green-500
        light: "#4ADE80",   // Tailwind green-400
        dark: "#16A34A",    // Tailwind green-600
        glow: "rgba(34, 197, 94, 0.4)",
    },

    // Status colors
    status: {
        error: "#EF4444", // Neon Red
        warning: "#EAB308", // Yellow
    },

    // Datos de resultados EXACTOS (Cyber-Dashboard reqs)
    results: {
        totalTests: 97, // Total tests in the suite
        withoutHealing: {
            failed: 89,
            failRate: 91.8, // 89/97 as requested
            correctionTime: 89 * 15, // 15 minutos por test (1335 mins total)
        },
        withHealing: {
            recovered: 89,
            finalFailed: 0,
            recoveryRate: 100, // 89 recovered out of 89 affected
            finalFailRate: 0, // 0 final failures
            correctionTime: 30, // Tiempo extra computacional
        },
        timeSaved: (89 * 15) - 30, // 1305 mins saved
        roiPercentage: 100, // 100% success recovery rate
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

