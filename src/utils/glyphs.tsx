import { SeededRandom, createSeededRandom } from './seededRandom';

export interface GlyphConfig {
    size: number;
    strokeWidth: number;
    color: string;
    glowColor?: string;
}

// Tipos de glyphs disponibles
type GlyphType = 'hexagon' | 'circuit' | 'radial' | 'orbital' | 'pulse';

// Generar path SVG para un glyph basado en seed
export const generateGlyph = (
    seed: string,
    config: GlyphConfig = { size: 48, strokeWidth: 1.5, color: '#8B5CF6' }
): string => {
    const rng = createSeededRandom(seed);
    const { size, strokeWidth, color } = config;
    const center = size / 2;
    const radius = size / 2 - strokeWidth * 2;

    // Seleccionar tipo basado en seed
    const types: GlyphType[] = ['hexagon', 'circuit', 'radial', 'orbital', 'pulse'];
    const type = rng.pick(types);

    let paths = '';

    switch (type) {
        case 'hexagon':
            paths = generateHexagonGlyph(rng, center, radius, strokeWidth, color);
            break;
        case 'circuit':
            paths = generateCircuitGlyph(rng, center, radius, strokeWidth, color);
            break;
        case 'radial':
            paths = generateRadialGlyph(rng, center, radius, strokeWidth, color);
            break;
        case 'orbital':
            paths = generateOrbitalGlyph(rng, center, radius, strokeWidth, color);
            break;
        case 'pulse':
            paths = generatePulseGlyph(rng, center, radius, strokeWidth, color);
            break;
    }

    return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow-${seed}" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#glow-${seed})" opacity="0.9">
        ${paths}
      </g>
    </svg>
  `;
};

// Hexágono con variaciones
function generateHexagonGlyph(
    rng: SeededRandom,
    center: number,
    radius: number,
    strokeWidth: number,
    color: string
): string {
    const sides = rng.int(5, 8);
    const innerRadius = radius * rng.range(0.3, 0.6);

    let outerPoints = '';
    let innerPoints = '';

    for (let i = 0; i < sides; i++) {
        const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
        const ox = center + Math.cos(angle) * radius;
        const oy = center + Math.sin(angle) * radius;
        const ix = center + Math.cos(angle) * innerRadius;
        const iy = center + Math.sin(angle) * innerRadius;

        outerPoints += `${i === 0 ? 'M' : 'L'} ${ox} ${oy} `;
        innerPoints += `${i === 0 ? 'M' : 'L'} ${ix} ${iy} `;
    }

    return `
    <path d="${outerPoints} Z" stroke="${color}" stroke-width="${strokeWidth}" fill="none"/>
    <path d="${innerPoints} Z" stroke="${color}" stroke-width="${strokeWidth * 0.7}" fill="none" opacity="0.5"/>
    ${rng.chance(0.5) ? `<circle cx="${center}" cy="${center}" r="${strokeWidth * 2}" fill="${color}"/>` : ''}
  `;
}

// Circuito/nodos conectados
function generateCircuitGlyph(
    rng: SeededRandom,
    center: number,
    radius: number,
    strokeWidth: number,
    color: string
): string {
    const nodes: Array<{ x: number; y: number }> = [];
    const nodeCount = rng.int(4, 7);

    // Generar nodos en posiciones semi-aleatorias
    for (let i = 0; i < nodeCount; i++) {
        const angle = rng.range(0, Math.PI * 2);
        const dist = rng.range(radius * 0.3, radius * 0.9);
        nodes.push({
            x: center + Math.cos(angle) * dist,
            y: center + Math.sin(angle) * dist,
        });
    }

    let result = '';

    // Conectar algunos nodos
    for (let i = 0; i < nodes.length; i++) {
        const connections = rng.int(1, 2);
        for (let j = 0; j < connections; j++) {
            const target = rng.int(0, nodes.length - 1);
            if (target !== i) {
                result += `<line x1="${nodes[i].x}" y1="${nodes[i].y}" x2="${nodes[target].x}" y2="${nodes[target].y}" stroke="${color}" stroke-width="${strokeWidth * 0.5}" opacity="0.4"/>`;
            }
        }
    }

    // Dibujar nodos
    nodes.forEach((node) => {
        const nodeSize = rng.range(2, 4);
        result += `<circle cx="${node.x}" cy="${node.y}" r="${nodeSize}" fill="${color}"/>`;
    });

    return result;
}

// Rayos radiales
function generateRadialGlyph(
    rng: SeededRandom,
    center: number,
    radius: number,
    strokeWidth: number,
    color: string
): string {
    const rayCount = rng.int(6, 12);
    let result = `<circle cx="${center}" cy="${center}" r="${radius * 0.15}" fill="${color}"/>`;

    for (let i = 0; i < rayCount; i++) {
        const angle = (i * 2 * Math.PI) / rayCount + rng.range(-0.1, 0.1);
        const innerR = radius * rng.range(0.2, 0.35);
        const outerR = radius * rng.range(0.7, 1);

        const x1 = center + Math.cos(angle) * innerR;
        const y1 = center + Math.sin(angle) * innerR;
        const x2 = center + Math.cos(angle) * outerR;
        const y2 = center + Math.sin(angle) * outerR;

        result += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" opacity="${rng.range(0.5, 1)}"/>`;

        if (rng.chance(0.3)) {
            result += `<circle cx="${x2}" cy="${y2}" r="${strokeWidth}" fill="${color}"/>`;
        }
    }

    return result;
}

// Órbitas concéntricas
function generateOrbitalGlyph(
    rng: SeededRandom,
    center: number,
    radius: number,
    strokeWidth: number,
    color: string
): string {
    const orbitCount = rng.int(2, 4);
    let result = `<circle cx="${center}" cy="${center}" r="${strokeWidth * 2}" fill="${color}"/>`;

    for (let i = 0; i < orbitCount; i++) {
        const orbitRadius = radius * ((i + 1) / (orbitCount + 1)) * rng.range(0.9, 1.1);
        const dashArray = rng.chance(0.5) ? `${rng.int(5, 15)} ${rng.int(3, 8)}` : 'none';

        result += `<circle cx="${center}" cy="${center}" r="${orbitRadius}" stroke="${color}" stroke-width="${strokeWidth * 0.7}" fill="none" stroke-dasharray="${dashArray}" opacity="${0.4 + i * 0.2}"/>`;

        // Punto en órbita
        if (rng.chance(0.7)) {
            const dotAngle = rng.range(0, Math.PI * 2);
            const dotX = center + Math.cos(dotAngle) * orbitRadius;
            const dotY = center + Math.sin(dotAngle) * orbitRadius;
            result += `<circle cx="${dotX}" cy="${dotY}" r="${strokeWidth * 1.5}" fill="${color}"/>`;
        }
    }

    return result;
}

// Pulso/ondas
function generatePulseGlyph(
    rng: SeededRandom,
    center: number,
    radius: number,
    strokeWidth: number,
    color: string
): string {
    const waveCount = rng.int(3, 5);
    let result = `<circle cx="${center}" cy="${center}" r="${strokeWidth * 2.5}" fill="${color}"/>`;

    for (let i = 0; i < waveCount; i++) {
        const waveRadius = radius * ((i + 1) / waveCount);
        const opacity = 1 - (i / waveCount) * 0.7;

        result += `<circle cx="${center}" cy="${center}" r="${waveRadius}" stroke="${color}" stroke-width="${strokeWidth}" fill="none" opacity="${opacity}"/>`;
    }

    return result;
}

// Componente React para renderizar glyph
export const GlyphSVG = ({
    seed,
    size = 48,
    color = '#8B5CF6',
    className = '',
}: {
    seed: string;
    size?: number;
    color?: string;
    className?: string;
}) => {
    const svg = generateGlyph(seed, {
        size,
        strokeWidth: size / 32,
        color,
        glowColor: color,
    });

    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: svg }}
            aria-hidden="true"
        />
    );
};
