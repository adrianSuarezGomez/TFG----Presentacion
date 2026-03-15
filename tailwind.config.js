export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                accent: {
                    DEFAULT: '#86EFAC',
                    light: '#BBF7D0',
                    dark: '#4ADE80',
                    glow: 'rgba(134, 239, 172, 0.35)',
                },
                surface: {
                    DEFAULT: '#09090B',
                    elevated: '#111113',
                    glass: 'rgba(17, 17, 19, 0.75)',
                    card: 'rgba(20, 20, 24, 0.6)',
                },
                muted: {
                    DEFAULT: '#71717A',
                    light: '#A1A1AA',
                    dark: '#52525B',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                display: ['Outfit', 'system-ui', '-apple-system', 'sans-serif'],
                mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
            },
            fontSize: {
                '4xl': ['2.5rem', { lineHeight: '1.1' }],
                '5xl': ['3rem', { lineHeight: '1.1' }],
                '6xl': ['3.75rem', { lineHeight: '1.05' }],
                '7xl': ['4.5rem', { lineHeight: '1' }],
            },
            animation: {
                'aurora': 'aurora 20s ease infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 3s ease-in-out infinite alternate',
                'gradient-shift': 'gradientShift 8s ease infinite',
                'shimmer': 'shimmer 2.5s ease-in-out infinite',
            },
            keyframes: {
                aurora: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                glow: {
                    '0%': { opacity: '0.4', filter: 'blur(20px)' },
                    '100%': { opacity: '0.7', filter: 'blur(30px)' },
                },
                gradientShift: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                'glass': '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                'glass-hover': '0 16px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                'glow-sm': '0 0 20px -5px rgba(134, 239, 172, 0.3)',
                'glow-md': '0 0 40px -10px rgba(134, 239, 172, 0.4)',
                'glow-lg': '0 0 60px -15px rgba(134, 239, 172, 0.5)',
            },
        },
    },
    plugins: [],
}
