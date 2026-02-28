// Seeded random number generator para consistencia
export class SeededRandom {
    private seed: number;

    constructor(seed: string) {
        // Convertir string a número usando hash simple
        this.seed = this.hashString(seed);
    }

    private hashString(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convertir a 32bit integer
        }
        return Math.abs(hash);
    }

    // Linear Congruential Generator
    next(): number {
        this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
        return this.seed / 4294967296;
    }

    // Random en rango [min, max)
    range(min: number, max: number): number {
        return min + this.next() * (max - min);
    }

    // Random entero en rango [min, max]
    int(min: number, max: number): number {
        return Math.floor(this.range(min, max + 1));
    }

    // Random de array
    pick<T>(arr: T[]): T {
        return arr[this.int(0, arr.length - 1)];
    }

    // Random boolean con probabilidad
    chance(probability: number = 0.5): boolean {
        return this.next() < probability;
    }
}

// Factory function para crear RNG
export const createSeededRandom = (seed: string): SeededRandom => {
    return new SeededRandom(seed);
};
