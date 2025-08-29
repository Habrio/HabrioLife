// Design tokens for HabrioLife — single source of truth
// Use only these tokens + Tailwind utilities. No inline styles.

export const colors = {
  // Brand palette
  saffron: {
    50: '#FFF7E6',
    100: '#FFE9BF',
    200: '#FFD080',
    300: '#FFB547',
    400: '#FFA31F',
    500: '#FF8C00', // primary brand (saffron/orange)
    600: '#E67E00',
    700: '#B36200',
    800: '#804600',
    900: '#4D2A00',
  },
  green: {
    50: '#EAFBF0',
    100: '#D1F5DC',
    200: '#A4EBC0',
    300: '#78E2A5',
    400: '#4FD68A',
    500: '#22C55E', // secondary brand (green)
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1F2937',
    900: '#0F172A',
  },
} as const;

export const radii = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.25rem',
  pill: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 12px -2px rgb(0 0 0 / 0.08)',
  lg: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
  xl: '0 20px 45px -10px rgb(0 0 0 / 0.15)',
} as const;

export const spacing = {
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
} as const;

export const font = {
  family: {
    sans: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
} as const;

export type DesignTokens = {
  colors: typeof colors;
  radii: typeof radii;
  shadows: typeof shadows;
  spacing: typeof spacing;
  font: typeof font;
};

export const tokens: DesignTokens = { colors, radii, shadows, spacing, font };

