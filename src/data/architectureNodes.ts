export interface ArchitectureNode {
    id: string;
    label: string;
    description: string;
    details: string[];
    position: { x: number; y: number };
    connections: string[];
}

export const architectureNodes: ArchitectureNode[] = [
    {
        id: "tests",
        label: "Tests / POM",
        description: "Tests de Playwright con Page Object Model que usan locators.",
        details: [
            "Cada test define acciones con locators",
            "Los locators pueden ser CSS, XPath, data-testid",
            "Cuando fallan, activan el sistema de healing",
        ],
        position: { x: 12, y: 20 },
        connections: ["fixtures"],
    },
    {
        id: "fixtures",
        label: "Fixtures",
        description: "Fixtures de Playwright que inyectan el wrapper de auto-reparación.",
        details: [
            "Extienden los fixtures base de Playwright",
            "Envuelven page y context con el proxy",
            "Configurables via playwright.config.ts",
        ],
        position: { x: 32, y: 20 },
        connections: ["wrapper"],
    },
    {
        id: "wrapper",
        label: "Intercepción Proxy",
        description: "Intercepta llamadas a locators y detecta fallos de selector mediante Proxy en JS.",
        details: [
            "Actúa como capa intermedia transparente",
            "Detecta TimeoutError en interacciones",
            "Dispara el flujo de healing sin alterar el test original",
        ],
        position: { x: 52, y: 20 },
        connections: ["dom-extractor"],
    },
    {
        id: "dom-extractor",
        label: "DOM Extractor",
        description: "Captura el estado del DOM para dar contexto al LLM.",
        details: [
            "Extrae HTML relevante (no todo el DOM)",
            "Identifica atributos semánticos",
            "Limita el tamaño del contexto",
        ],
        position: { x: 72, y: 20 },
        connections: ["prompt-builder"],
    },
    {
        id: "prompt-builder",
        label: "Prompt Builder",
        description: "Construye el prompt estructurado para el LLM.",
        details: [
            "Incluye: selector fallido, DOM context, tipo de acción",
            "Pide un único selector válido como respuesta",
            "Añade instrucciones de formato JSON",
        ],
        position: { x: 88, y: 20 },
        connections: ["llm-client"],
    },
    {
        id: "llm-client",
        label: "LLM Local",
        description: "Comunica con el modelo de lenguaje ejecutándose localmente para evaluar el DOM.",
        details: [
            "Genera el selector alternativo basado en contexto semántico",
            "Sin envío de datos al exterior (privacidad máxima)",
            "Responde con formato JSON estricto",
        ],
        position: { x: 88, y: 50 },
        connections: ["validator"],
    },
    {
        id: "validator",
        label: "Validación del nuevo Selector",
        description: "Valida empíricamente que el selector propuesto por el LLM realmente funciona en el SUT.",
        details: [
            "Aplica el selector propuesto en tiempo de ejecución",
            "Retenta la acción original (click, fill, etc.)",
            "Descarta la sugerencia si falla, evitando falsos positivos",
        ],
        position: { x: 60, y: 50 },
        connections: ["persistor"],
    },
    {
        id: "persistor",
        label: "Persistencia",
        description: "Almacena la sanación del localizador para consolidar la reparación en el código.",
        details: [
            "Escribe en el archivo de logs la modificación exitosa",
            "Facilita la refactorización final manual (Shift-Left Testing)",
            "Incrementa la mantenibilidad del testware permanentemente",
        ],
        position: { x: 32, y: 50 },
        connections: ["observability"],
    },
    {
        id: "observability",
        label: "Observability",
        description: "Registra métricas y logs de cada reparación.",
        details: [
            "Timestamp, test, selector old/new",
            "Latencia, éxito/fallo",
            "Exportable a dashboard externo",
        ],
        position: { x: 12, y: 50 },
        connections: [],
    },
];

// Obtener conexiones para dibujar líneas
export const getConnections = (): Array<{ from: string; to: string }> => {
    const connections: Array<{ from: string; to: string }> = [];
    architectureNodes.forEach((node) => {
        node.connections.forEach((targetId) => {
            connections.push({ from: node.id, to: targetId });
        });
    });
    return connections;
};
