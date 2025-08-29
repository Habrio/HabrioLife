Permanent guardrails for Codex when working on this repo

You are upgrading a Next.js 15 + Tailwind app to premium quality. GOLDEN RULES:

- Use Tailwind + shadcn/ui components (Button, Card, Input, Tabs, Sheet, Dialog, Dropdown, Toast, Skeleton).
- Use Framer Motion for micro-interactions (fade/slide, stagger, spring), no huge animations.
- Use lucide-react icons only.
- No inline styles; no CSS frameworks other than Tailwind.
- Typography: text-slate-800/600 (dark: slate-100/400), generous spacing, rounded-2xl, soft shadows.
- Accessibility: proper aria-* attributes, keyboard focus rings, and color contrast.
- Code quality: TypeScript, CVA for variants, tailwind-merge for class merging, file-scoped components.
- Do not add “basic” libraries (random UI kits, raw CSS libs).
- Keep existing visuals/animations; improve structure & consistency around them.
- If a component exists in shadcn/ui, start from it and theme with Tailwind.

Tokens: use only `src/styles/design-tokens.ts` + Tailwind utilities. Do not use inline styles.

