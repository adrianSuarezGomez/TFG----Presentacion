export interface Chapter {
    id: number;
    slug: string;
    title: string;
    subtitle: string;
}

export const chapters: Chapter[] = [
    {
        id: 1,
        slug: "hero",
        title: "Tests break. We heal them.",
        subtitle: "Self-Healing de locators en E2E con Playwright + IA local.",
    },
    {
        id: 2,
        slug: "tech-context",
        title: "El Ecosistema del Testing Automatizado",
        subtitle: "Contexto y fundamentos técnicos: pruebas E2E, localizadores y CI.",
    },
    {
        id: 3,
        slug: "the-pain",
        title: "El dolor real",
        subtitle: "Tests que rompen por cambios mínimos en la UI. Falsos negativos, pipelines en rojo, tiempo perdido.",
    },
    {
        id: 4,
        slug: "the-healing",
        title: "La reparación automática",
        subtitle: "Cuando un locator falla, el sistema intenta repararlo usando un LLM local.",
    },
    {
        id: 5,
        slug: "architecture",
        title: "Arquitectura del sistema",
        subtitle: "Componentes modulares integrados en el flujo de Playwright.",
    },
    {
        id: 6,
        slug: "results",
        title: "Resultados reales",
        subtitle: "Datos de experimento con 24 tests bajo mutaciones de DOM controladas.",
    },
    {
        id: 7,
        slug: "observability",
        title: "Observabilidad y futuro",
        subtitle: "El sistema registra cada reparación para análisis y mejora continua.",
    },
    {
        id: 8,
        slug: "live-demo",
        title: "Live Demo",
        subtitle: "Demostración en vivo del sistema de self-healing.",
    },
    {
        id: 9,
        slug: "thanks",
        title: "¡Gracias!",
        subtitle: "Cierre de la presentación.",
    },
];

export const getChapterById = (id: number): Chapter | undefined => {
    return chapters.find((c) => c.id === id);
};
