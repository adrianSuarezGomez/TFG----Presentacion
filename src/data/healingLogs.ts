export interface HealingLogEntry {
    id: string;
    timestamp: string;
    testName: string;
    oldSelector: string;
    newSelector: string;
    action: string;
    success: boolean;
    latencyMs: number;
    strictness: "conservative" | "aggressive";
}

// Datos deterministas para la demo (simulados)
export const healingLogs: HealingLogEntry[] = [
    {
        id: "heal-001",
        timestamp: "2024-01-15 10:23:45",
        testName: "login.spec.ts",
        oldSelector: "#username",
        newSelector: "[data-testid='username-input']",
        action: "fill",
        success: true,
        latencyMs: 234,
        strictness: "conservative",
    },
    {
        id: "heal-002",
        timestamp: "2024-01-15 10:24:12",
        testName: "login.spec.ts",
        oldSelector: "#password",
        newSelector: "[data-testid='password-input']",
        action: "fill",
        success: true,
        latencyMs: 189,
        strictness: "conservative",
    },
    {
        id: "heal-003",
        timestamp: "2024-01-15 10:25:01",
        testName: "dashboard.spec.ts",
        oldSelector: ".nav-menu > li:nth-child(2)",
        newSelector: "[aria-label='Dashboard']",
        action: "click",
        success: true,
        latencyMs: 312,
        strictness: "aggressive",
    },
    {
        id: "heal-004",
        timestamp: "2024-01-15 10:26:33",
        testName: "checkout.spec.ts",
        oldSelector: "#submit-btn",
        newSelector: "button[type='submit'][data-action='checkout']",
        action: "click",
        success: true,
        latencyMs: 278,
        strictness: "conservative",
    },
    {
        id: "heal-005",
        timestamp: "2024-01-15 10:27:15",
        testName: "profile.spec.ts",
        oldSelector: "div.user-avatar",
        newSelector: "[data-testid='user-profile-avatar']",
        action: "click",
        success: true,
        latencyMs: 201,
        strictness: "conservative",
    },
    {
        id: "heal-006",
        timestamp: "2024-01-15 10:28:44",
        testName: "search.spec.ts",
        oldSelector: "#search-input",
        newSelector: "input[placeholder*='Buscar']",
        action: "fill",
        success: true,
        latencyMs: 156,
        strictness: "aggressive",
    },
    {
        id: "heal-007",
        timestamp: "2024-01-15 10:29:22",
        testName: "cart.spec.ts",
        oldSelector: ".cart-item-remove",
        newSelector: "[aria-label='Eliminar del carrito']",
        action: "click",
        success: false,
        latencyMs: 445,
        strictness: "aggressive",
    },
    {
        id: "heal-008",
        timestamp: "2024-01-15 10:30:11",
        testName: "notifications.spec.ts",
        oldSelector: "#notif-badge",
        newSelector: "[data-testid='notification-counter']",
        action: "isVisible",
        success: true,
        latencyMs: 167,
        strictness: "conservative",
    },
    {
        id: "heal-009",
        timestamp: "2024-01-15 10:31:05",
        testName: "settings.spec.ts",
        oldSelector: "input#dark-mode-toggle",
        newSelector: "[role='switch'][aria-label='Modo oscuro']",
        action: "click",
        success: true,
        latencyMs: 289,
        strictness: "conservative",
    },
];

// Ranking de locators más inestables
export const unstableLocators = [
    { selector: "#username", failures: 4, healed: 4 },
    { selector: ".nav-menu > li:nth-child(2)", failures: 3, healed: 2 },
    { selector: "#submit-btn", failures: 3, healed: 3 },
    { selector: ".cart-item-remove", failures: 2, healed: 1 },
    { selector: "#search-input", failures: 2, healed: 2 },
];
