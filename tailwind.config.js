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
                    DEFAULT: '#8B5CF6',
                    light: '#A78BFA',
                    dark: '#7C3AED',
                    glow: 'rgba(139, 92, 246, 0.4)',
                },
                surface: {
                    DEFAULT: '#0F0F14',
                    elevated: '#16161D',
                    glass: 'rgba(22, 22, 29, 0.8)',
                },
            },
            fontFamily: {
                sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
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
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                aurora: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                glow: {
                    '0%': { opacity: '0.5', filter: 'blur(20px)' },
                    '100%': { opacity: '0.8', filter: 'blur(30px)' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}
