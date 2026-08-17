# Manifold Systems

Company site for Manifold Systems — systems built around intelligent agents.

Marketing site covering the Manifold Systems portfolio: Kamui (agent ↔ computer), Kumo (human ↔ agent), and Kage (agent ↔ engineering).

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Cloudflare Workers (static assets + `/api/*`)

## Development

```bash
npm install
npm run dev
```

## Build & deploy

```bash
npm run build       # production build
npm run preview     # preview the build locally
npx wrangler deploy # deploy to Cloudflare Workers
```

`npm run typecheck` runs TypeScript with no emit.

---

A [Manifold Systems](https://github.com/ManifoldSystems) project.
